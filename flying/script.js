const flyer = document.getElementById('flyer');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let posY = 20; // Starting position of the flyer
const jumpHeight = 180; // Increase jump height
const gravity = 3; // Decrease the speed of falling
let obstacles = [];

// Handle jumping
function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpCount = 0;
    const upInterval = setInterval(() => {
        if (jumpCount >= jumpHeight) {
            clearInterval(upInterval);
            // Fall down
            const downInterval = setInterval(() => {
                if (jumpCount <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                posY -= gravity;
                jumpCount -= gravity;
                flyer.style.bottom = `${posY}px`;
            }, 20);
        }
        posY += gravity;
        jumpCount += gravity;
        flyer.style.bottom = `${posY}px`;
    }, 20);
}

// Create obstacles
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    document.body.appendChild(obstacle);

    let obstaclePos = window.innerWidth;
    obstacle.style.left = `${obstaclePos}px`;

    const obstacleInterval = setInterval(() => {
        if (obstaclePos < -50) {
            clearInterval(obstacleInterval);
            document.body.removeChild(obstacle);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else if (obstaclePos < 100 && obstaclePos > 50 && posY < 130) { // Adjust collision detection
            // Collision detection
            clearInterval(obstacleInterval);
            document.body.removeChild(obstacle);
            alert('Game Over! Final Score: ' + score);
            location.reload();
        }

        obstaclePos -= 5;
        obstacle.style.left = `${obstaclePos}px`;
    }, 20);

    obstacles.push(obstacle);
}

// Start creating obstacles at intervals
setInterval(createObstacle, 2000);

// Handle space key for jumping
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
