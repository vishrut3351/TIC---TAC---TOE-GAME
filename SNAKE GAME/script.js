// JavaScript Code
let blockSize = 25;
let rows = 20;
let cols = 30;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let foodX;
let foodY;

let velocityX = 0;
let velocityY = 0;

let gameOver = false;
let snakeBody = [];
let foodCount = 0;

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

let highScore = getCookie("highScore") || 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);

    document.getElementById("highScore").textContent = highScore;
    document.getElementById("foodCount").textContent = foodCount;
};

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    let sound = document.getElementById("bgAudio");
    sound.play();

    if (snakeX === foodX && snakeY === foodY) {
        eatFood();
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    context.fillStyle = "yellow";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        handleGameOver();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            handleGameOver();
        }
    }
}

function eatFood() {
    let foodEatSound = document.getElementById("foodEatSound");
    foodEatSound.play();
    snakeBody.push([snakeX, snakeY]);
    foodCount++;
    document.getElementById("foodCount").textContent = foodCount;
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function handleGameOver() {
    gameOver = true;

    let gameOverSound = document.getElementById("gameOverSound");
    gameOverSound.play();

    if (foodCount > highScore) {
        highScore = foodCount;
        setCookie("highScore", highScore, 365);
    }

    alert("Game Over! You ate " + foodCount + " food items.");
    restartGame();
}

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    foodCount = 0;
    gameOver = false;
    placeFood();

    document.getElementById("foodCount").textContent = foodCount;
    document.getElementById("highScore").textContent = highScore;
}