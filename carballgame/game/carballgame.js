class CarBallGame {
    Run() {

        const CANVAS_HEIGHT = 600;
        const CANVAS_WIDTH  = 800;

        const GRAVITY    = 0.3;

        var canvasContext;
        var canvas;

        var keyW = false;
        var keyA = false;
        var keyS = false;
        var keyD = false;

        var keyUpArrow = false;
        var keyLeftArrow = false;
        var keyDownArrow = false;
        var keyRightArrow = false;

        var player1;
        var player2;
        var theBall;

        var score = 0;
        var highScore = 0;



        window.onload = function () {
            //Init players and ball
            player1 = new Car;
            player1.Init(40 ,CANVAS_HEIGHT, 'red');

            player2 = new Car;
            player2.Init(CANVAS_WIDTH - 80 ,CANVAS_HEIGHT, 'blue');

            theBall = new Ball;
            theBall.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

            canvas = document.getElementById('canvas');
            canvasContext = canvas.getContext('2d');

            var framesPerSecond = 60;
            setInterval(function () {
                moveEverything();
                drawEverything();
            }, 1000 / framesPerSecond);

            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("keyup", onKeyUp);
        }
        function onKeyDown(event) {
            //w
            if (event.keyCode == 87) {
                keyW = true;
                if (player1.canJump){
                    player1.ySpeed -= player1.JUMP_FORCE;
                    player1.canJump = false;
                }

            }
            //a
            if (event.keyCode == 65) {
                keyA = true;
            }
            //s
            if (event.keyCode == 83) {
                keyS = true;
            }
            //d
            if (event.keyCode == 68) {
                keyD = true;
            }

            //up
            if (event.keyCode == 38) {
                keyUpArrow = true;
                if (player2.canJump){
                    player2.ySpeed -= player2.JUMP_FORCE;
                    player2.canJump = false;
                }

            }
            //left
            if (event.keyCode == 37) {
                keyLeftArrow = true;
            }
            //down
            if (event.keyCode == 40) {
                keyDownArrow = true;
            }
            //right
            if (event.keyCode == 39) {
                keyRightArrow = true;
            }
        }

        function onKeyUp(event) {
            //w
            if (event.keyCode == 87) {
                keyW = false;
            }
            //a
            if (event.keyCode == 65) {
                keyA = false;
            }
            //s
            if (event.keyCode == 83) {
                keyS = false;
            }
            //d
            if (event.keyCode == 68) {
                keyD = false;
            }
            //up
            if (event.keyCode == 38) {
                keyUpArrow = false;
            }
            //left
            if (event.keyCode == 37) {
                keyLeftArrow = false;
            }
            //down
            if (event.keyCode == 40) {
                keyDownArrow = false;
            }
            //right
            if (event.keyCode == 39) {
                keyRightArrow = false;
            }
        }

        function moveEverything() {

            // Update player and ball
            player1.Update(keyA, keyS, keyD, GRAVITY, slowAfterTime);
            player2.Update(keyLeftArrow, keyDownArrow, keyRightArrow, GRAVITY, slowAfterTime);
            theBall.Update(GRAVITY, slowAfterTime);

            // check collisions
            if (checkCollision(player1, theBall.xPos - theBall.RADIUS, theBall.yPos - theBall.RADIUS, theBall.RADIUS * 2, theBall.RADIUS * 2))
                collisionResult(player1, theBall);

            if (checkCollision(player2, theBall.xPos - theBall.RADIUS, theBall.yPos - theBall.RADIUS, theBall.RADIUS * 2, theBall.RADIUS * 2))
                collisionResult(player2, theBall);

            // Clamp objects to screen
            player1.Clamp(CANVAS_WIDTH, CANVAS_HEIGHT);
            player2.Clamp(CANVAS_WIDTH, CANVAS_HEIGHT);
            score = theBall.Clamp(CANVAS_WIDTH, CANVAS_HEIGHT, score);
        }

        // https://stackoverflow.com/questions/2440377/javascript-collision-detection
        function checkCollision(a, bX, bY, bWidth, bHeight) {
            return !(
                ((a.yPos + a.HEIGHT) < (bY)) ||
                (a.yPos > (bY + bHeight)) ||
                ((a.xPos + a.WIDTH) < bX) ||
                (a.xPos > (bX + bWidth))
            );
        }

        function collisionResult(car, ball) {
            let angleX;
            let angleY;

            angleX = -((car.xPos + car.WIDTH/2) - ball.xPos);
            angleY = -((car.yPos + car.HEIGHT/2) - ball.yPos);

            ball.xSpeed = angleX;
            ball.ySpeed = angleY;

            score++;
            if (score > highScore)
                highScore = score;

            return;
        }

        function slowAfterTime(speed) {
            speed -= (speed / 100);
            if (speed > 0)
                speed -= .02;
            else if (speed < 0)
                speed += .02;
            return speed;
        }

        function drawEverything() {
            // Draw Background
            colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'lightgreen');

            // Draw Objects
            theBall.Draw(colorCircle);
            player1.Draw(colorRect);
            player2.Draw(colorRect);

            // Draw text
            displayText("Score: " + score.toFixed(0), CANVAS_WIDTH/2 , 75, "red");
            displayText("HighScore: " + highScore.toFixed(0), CANVAS_WIDTH/2 , 35, "red");
        }

        function colorCircle(centerX, centerY, radius, drawColor) {
            canvasContext.fillStyle = drawColor;
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            canvasContext.fill();
        }

        function colorRect(leftX, topY, width, height, drawColor) {
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(leftX, topY, width, height);
        }

        function displayText(text, x, y, colour) {
            canvasContext.font="60px Arial";
            canvasContext.font = "30px Comic Sans MS";
            canvasContext.fillStyle = colour;
            canvasContext.textAlign = "center";
            canvasContext.fillText(text, x, y);
        }
    }
}

CarBallGameInst = new CarBallGame();