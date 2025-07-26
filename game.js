const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameRunning = false;
let target = {
    x: 0,
    y: 0,
    size: 30,
    color: 'red'
};

function drawTarget() {
    ctx.fillStyle = target.color;
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
    ctx.fill();
}

function placeTarget() {
    target.x = Math.random() * (canvas.width - target.size * 2) + target.size;
    target.y = Math.random() * (canvas.height - target.size * 2) + target.size;
    drawTarget();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function startGame() {
    score = 0;
    gameRunning = true;
    updateScore();
    placeTarget();
}

canvas.addEventListener('click', (e) => {
    if (!gameRunning) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - target.x, 2) + 
        Math.pow(mouseY - target.y, 2)
    );
    
    if (distance < target.size) {
        score++;
        updateScore();
        clearCanvas();
        placeTarget();
    }
});

startBtn.addEventListener('click', startGame);
