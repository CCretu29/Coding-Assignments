document.addEventListener('DOMContentLoaded', () => {
    const bird = document.getElementById('bird');
    const gameContainer = document.getElementById('game-container');
    const pipeContainer = document.getElementById('pipe-container');
    const scoreDisplay = document.getElementById('score');

    let birdY = 200;
    let birdVelocity = 0;
    const gravity = 0.5;
    const jumpStrength = -10;
    const pipeSpeed = 2;
    const pipeGap = 200; // Increased gap to make it easier
    let gameOver = false;
    let gameStarted = false;
    let score = 0;

    function resetGame() {
        birdY = 200;
        birdVelocity = 0;
        gameOver = false;
        gameStarted = false;
        score = 0;
        scoreDisplay.innerText = 'Score: 0';
        bird.style.top = `${birdY}px`;

        while (pipeContainer.firstChild) {
            pipeContainer.removeChild(pipeContainer.firstChild);
        }

        createPipe();
    }

    function jump() {
        if (gameStarted && !gameOver) {
            birdVelocity = jumpStrength;
        }
    }

    function createPipe() {
        const pipeTop = document.createElement('div');
        pipeTop.classList.add('pipe', 'top');
        pipeTop.style.left = '400px';

        const pipeBottom = document.createElement('div');
        pipeBottom.classList.add('pipe', 'bottom');
        pipeBottom.style.left = '400px';

        const pipeHeight = Math.random() * (300 - 100) + 100;
        pipeTop.style.height = `${pipeHeight}px`;
        pipeBottom.style.height = `${500 - pipeHeight - pipeGap}px`;

        pipeContainer.appendChild(pipeTop);
        pipeContainer.appendChild(pipeBottom);
    }

    function updatePipes() {
        const pipes = document.querySelectorAll('.pipe');
        pipes.forEach(pipe => {
            const pipeLeft = parseInt(pipe.style.left);
            if (pipeLeft < -60) {
                pipe.remove();
            } else {
                pipe.style.left = `${pipeLeft - pipeSpeed}px`;
            }

            // Increment score if pipe passed the bird's left position and is of class 'bottom'
            if (pipeLeft === 200 && pipe.classList.contains('bottom')) {
                score++;
                scoreDisplay.innerText = `Score: ${score}`;
            }
        });

        // Ensure we always have enough pipes on screen
        if (pipes.length < 4) {
            createPipe();
        }
    }

    function checkCollision() {
        const pipes = document.querySelectorAll('.pipe');
        const birdRect = bird.getBoundingClientRect();
        pipes.forEach(pipe => {
            const pipeRect = pipe.getBoundingClientRect();

            if (
                birdRect.right > pipeRect.left &&
                birdRect.left < pipeRect.right &&
                birdRect.bottom > pipeRect.top &&
                birdRect.top < pipeRect.bottom
            ) {
                gameOver = true;
            }
        });

        if (birdY < 0 || birdY > 560) {
            gameOver = true;
        }
    }

    function update() {
        if (gameStarted && !gameOver) {
            birdVelocity += gravity;
            birdY += birdVelocity;
            bird.style.top = `${birdY}px`;

            updatePipes();
            checkCollision();

            requestAnimationFrame(update);
        } else if (gameOver) {
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Space') {
                    resetGame();
                }
            }, { once: true });
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (!gameStarted) {
                gameStarted = true;
                update();
            }
            jump();
        }
    });

    resetGame();
});
