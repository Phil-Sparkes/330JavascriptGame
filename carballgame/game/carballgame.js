class CarBallGame {
    Run() {

        const CANVAS_HEIGHT = 600;
        const CANVAS_WIDTH  = 800;

        const GRAVITY    = 0.3;


        const BALL_RADIUS = 10;
        const BALL_MAX_SPEED = 15;

        var canvasContext;
        var canvas;

        var ballXPos   = CANVAS_WIDTH/2;
        var ballYPos   = CANVAS_HEIGHT/2;
        var ballXSpeed = 0;
        var ballYSpeed = 0;


        var keyW = false;
        var keyA = false;
        var keyS = false;
        var keyD = false;

        var player1;
        var theBall;



        window.onload = function () {
            player1 = new Car;
            player1.Init(0,0);
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
        }

        function moveEverything() {

            player1.Update(keyA, keyS, keyD, GRAVITY, slowAfterTime);
            theBall.Update(GRAVITY, slowAfterTime);

            if (checkCollision(player1, theBall.xPos - theBall.RADIUS, theBall.yPos - theBall.RADIUS, theBall.RADIUS * 2, theBall.RADIUS * 2))
                collisionResult(player1, theBall,ballYSpeed, ballXPos, ballYPos);

            player1.Clamp(CANVAS_WIDTH, CANVAS_HEIGHT);
            theBall.Clamp(CANVAS_WIDTH, CANVAS_HEIGHT);
            // // clamp ball position
            // if (ballXPos < 0) {
            //     ballXSpeed = -ballXSpeed;
            //     ballXPos = 0;
            // }
            // else if (ballXPos > CANVAS_WIDTH - BALL_RADIUS) {
            //     ballXSpeed = -ballXSpeed;
            //     ballXPos = CANVAS_WIDTH - BALL_RADIUS;
            // }
            // if (ballYPos < 0) {
            //     ballYSpeed = -ballYSpeed;
            //     ballYPos = 0;
            // }
            // else if (ballYPos > CANVAS_HEIGHT - BALL_RADIUS) {
            //     ballYSpeed = -ballYSpeed;
            //     ballYPos = CANVAS_HEIGHT - BALL_RADIUS;
            // }

            // apply gravity
            // addGravity();

            // Slow down after time
            // ballXSpeed = slowAfterTime(ballXSpeed);
            // ballYSpeed = slowAfterTime(ballYSpeed);
            //
            // // apply movement
            // ballXPos += ballXSpeed;
            // ballYPos += ballYSpeed;

            // clamp ball speed
            // if (ballXSpeed > BALL_MAX_SPEED)
            //     ballXSpeed = BALL_MAX_SPEED;
            // if (ballXSpeed < -BALL_MAX_SPEED)
            //     ballXSpeed = -BALL_MAX_SPEED;
            // if (ballYSpeed > BALL_MAX_SPEED)
            //     ballYSpeed = BALL_MAX_SPEED;
            // if (ballYSpeed < -BALL_MAX_SPEED)
            //     ballYSpeed = -BALL_MAX_SPEED;

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

        function collisionResult(car, ball, bSpeedY, bPosX, bPosY) {
            var speedX;
            var speedY;
            var speed;
            var velocityX;
            var velocityY;
            var angleX;
            var angleY;

            //speedX = a.xSpeed + bSpeedX;
            //speedY = a.ySpeed + bSpeedY;

            angleX = -((car.xPos + car.WIDTH/2) - ball.xPos);
            angleY = -((car.yPos + car.HEIGHT/2) - ball.yPos);
            ball.xSpeed = angleX;
            ball.ySpeed = angleY;

            // if (speedX > 0)
            //     speedX -5;
            // else
            //     speedX +5;
            // if (speedY > 0)
            //     speedY -5;
            // else
            //     speedY +5;




            // if (angleX > 0 && angleY > 0) {
            //     velocityX = angleX / (angleX + angleY);
            //     velocityY = angleY / (angleX + angleY);
            // }
            // else if (angleX < 0 && angleY < 0) {
            //     velocityX = angleX / (angleX + angleY);
            //     velocityY = angleY / (angleX + angleY);
            // }
            //
            // else if (angleX > 0 && angleY < 0) {
            //     velocityX = angleX / (angleX + -angleY);
            //     velocityY = (angleY / (-angleX + angleY));
            // }
            // else if (angleX < 0 && angleY > 0) {
            //     velocityX = (angleX / (angleX + -angleY));
            //     velocityY = angleY / (-angleX + angleY);
            // }
            //
            // //velocityX = angleX / (angleX + angleY);
            // //velocityY = angleY / (angleX + angleY);
            //
            //
            //
            // if (speedX < 0)
            //     speedX * -1;
            // if (speedY < 0)
            //     speedY * -1;
            //
            // speed = speedX + speedY
            //
            // ballXSpeed = velocityX * speed;
            // ballYSpeed = velocityY * speed;
            //
            // if (ballYPos < carXPos)
            //     //ballYPos -= 10;
            //     ballYSpeed -= 5;

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
    }
}

CarBallGameInst = new CarBallGame();