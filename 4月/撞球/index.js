var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var start = document.getElementsByClassName('start')[0];
var canvasKey = true,
    stopKey = true,
    stop;
var x = canvas.width / 2,
    y = canvas.height - 25;
var dx = -2,
    dy = -2;
var paddleWidth = 75,
    paddleHeight = 15,
    paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false,
    leftPressed = false;
var brickWidth = 70,
    brickHeight = 20;
var score = 0,
    lives = 3;
var bricks = [];
for (var i = 0; i < 5; i++) {
    bricks[i] = [];
    for (var j = 0; j < 6; j++) {
        bricks[i][j] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#F44280';
    ctx.fill();
    ctx.closePath();
}
drawBall();

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#00f';
    ctx.fill();
    ctx.closePath();
}
drawPaddle();

function drawBricks() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = j * 76 + 15;
                var brickY = i * 26 + 35;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#8f63cc';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
drawBricks();

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#f44280';
    ctx.fillText('Score: ' + score, 15, 20);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#f44280';
    ctx.fillText('Lives: ' + lives, 410, 20);
}
drawScore();

function drawGo() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#f44280';
    ctx.fillText('GAME OVER', 150, 200);
}

function collisionDetection() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            var b = bricks[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == 30) {
                        document.location.reload();
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, 480, 460);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    collisionDetection();
    if (x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }
    if (y + dy < 10) {
        dy = -dy;
    } else if (y + dy > canvas.height - (10 + paddleHeight)) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (lives == 0) {
                drawGo();
                start.setAttribute('flage', 'flage');
                lives = 4;
                score = 0;
                stopKey = false;
                return;
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    x += dx;
    y += dy;
    stop = requestAnimationFrame(draw);
}
start.onclick = function() {
    stopKey = true;
    if (start.getAttribute('flage') == 'flage') {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                bricks[i][j].status = 1;
            }
        }
        start.setAttribute('flage', '');
        draw();
        document.addEventListener('mousemove', mouseMoveHandler, false);
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 32) {
        if (stopKey) {
            window.cancelAnimationFrame(stop);
            canvasKey = false;
        } else {
            stop = requestAnimationFrame(draw);
            canvasKey = true;
        }
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}