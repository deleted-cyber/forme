
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'red',
    dy: 0,
    gravity: 0.5,
    jumpForce: -10,
    grounded: false
};

let obstacles = [];
let frame = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = 'green';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function updateObstacles() {
    if (frame % 100 === 0) {
        let height = 50 + Math.random() * 50;
        obstacles.push({
            x: canvas.width,
            y: canvas.height - height,
            width: 20,
            height: height
        });
    }
    obstacles.forEach(obs => {
        obs.x -= 5;
    });
    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function handlePlayerPhysics() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.grounded = true;
    } else {
        player.grounded = false;
    }
}

function jump() {
    if (player.grounded) {
        player.dy = player.jumpForce;
        player.grounded = false;
    }
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        jump();
    }
});

function gameLoop() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateObstacles();
    handlePlayerPhysics();
    drawPlayer();
    drawObstacles();
    requestAnimationFrame(gameLoop);
}

gameLoop();
