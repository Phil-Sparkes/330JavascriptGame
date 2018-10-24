class CarBallGame {
    Run() {

        const CANVAS_HEIGHT = 600;
        const CANVAS_WIDTH  = 800;

        const GRAVITY    = 0.3;

        const CAR_WIDTH  = 40;
        const CAR_HEIGHT = 40;

        const BALL_RADIUS = 10;

        var canvasContext;
        var canvas;

        var ballXPos   = CANVAS_WIDTH/2;
        var ballYPos   = CANVAS_HEIGHT/2;
        var ballXSpeed = 0;
        var ballYSpeed = 0;

        var carXPos   = 100;
        var carYPos   = CANVAS_HEIGHT - 100;
        var carXSpeed = 0;
        var carYSpeed = 0;

        var canJump = true;

        var keyW = false;
        var keyA = false;
        var keyS = false;
        var keyD = false;



        window.onload = function () {
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
            //carYSpeed = 0;
            //carXSpeed = 0;
            //w
            if (event.keyCode == 87) {
                keyW = true;
                if (canJump){
                    carYSpeed -= 10;
                    canJump = false;
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



            // Set speed to 0
            //carXSpeed = 0;
            //carYSpeed = 0;


            // Add speed depending on buttons pressed
            if (keyW){
                //carYSpeed -= 1;
            }
            if (keyA){
                carXSpeed -= 1;
            }
            if (keyS){
                carYSpeed += 1;
            }
            if (keyD){
                carXSpeed += 1;
            }

            // apply gravity
            addGravity();

            // Slow down after time

            carXSpeed = slowAfterTime(carXSpeed);
            carYSpeed = slowAfterTime(carYSpeed);
            ballXSpeed = slowAfterTime(ballXSpeed);
            ballYSpeed = slowAfterTime(ballYSpeed);


            // Clamp car speed
            if (carXSpeed > 5)
                carXSpeed = 5;
            else if (carXSpeed < -5)
                carXSpeed = -5;
            if (carYSpeed > 10)
                carYSpeed = 10;
            else if (carYSpeed < -10)
                carYSpeed = -10;

            // apply movement due to speed
            carXPos += carXSpeed;
            carYPos += carYSpeed;
            //
            ballXPos += ballXSpeed;
            ballYPos += ballYSpeed;

            if (checkCollision(carXPos, carYPos, CAR_WIDTH, CAR_HEIGHT, ballXPos - BALL_RADIUS, ballYPos - BALL_RADIUS, BALL_RADIUS * 2, BALL_RADIUS * 2))
                collisionResult(carXSpeed, carYSpeed, carXPos + CAR_WIDTH/2, carYPos + CAR_HEIGHT/2, ballXSpeed,ballYSpeed, ballXPos, ballYPos);

            // clamp ball position
            if (ballXPos < 0) {
                ballXSpeed = -ballXSpeed;
                ballXPos = 0;
            }
            else if (ballXPos > CANVAS_WIDTH - BALL_RADIUS) {
                ballXSpeed = -ballXSpeed;
                ballXPos = CANVAS_WIDTH - BALL_RADIUS;
            }
            if (ballYPos < 0) {
                ballYSpeed = -ballYSpeed;
                ballYPos = 0;
            }
            else if (ballYPos > CANVAS_HEIGHT - BALL_RADIUS) {
                ballYSpeed = -ballYSpeed;
                ballYPos = CANVAS_HEIGHT - BALL_RADIUS;
            }

            // clamp car position
            if (carXPos < 0) {
                carXPos = 0;
                carXSpeed = 0;
            }
            else if (carXPos > CANVAS_WIDTH - CAR_WIDTH) {
                carXPos = CANVAS_WIDTH - CAR_WIDTH;
                carXSpeed = 0;
            }
            if (carYPos < 0) {
                carYPos = 0;
                carYSpeed = 0;
            }
            else if (carYPos > CANVAS_HEIGHT - CAR_HEIGHT) {
                carYPos = CANVAS_HEIGHT - CAR_HEIGHT;
                carYSpeed = 0;
                canJump = true;
            }


        }

        // https://stackoverflow.com/questions/2440377/javascript-collision-detection
        function checkCollision(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
            return !(
                ((aY + aHeight) < (bY)) ||
                (aY > (bY + bHeight)) ||
                ((aX + aWidth) < bX) ||
                (aX > (bX + bWidth))
            );
        }

        function collisionResult(aSpeedX, aSpeedY, aPosX, aPosY, bSpeedX, bSpeedY, bPosX, bPosY) {
            var speedX;
            var speedY;
            var velocityX;
            var velocityY;
            var angleX;
            var angleY;

            speedX = aSpeedX - bSpeedX;
            speedY = aSpeedY - bSpeedY;

            angleX = aPosX - bPosX;
            angleY = aPosY - bPosY;

            ballXSpeed = -angleX;
            ballYSpeed = -angleY;


            velocityX = aSpeedX + bSpeedX;

            //if (aSpeedX > 0 && bSpeedX > 0)
                //bSpeedX = -bSpeedX;
            //if (aSpeedX < 0 && bSpeedX < 0)
                //bSpeedX = -bSpeedX;
            return;
        }

        function slowAfterTime(speed) {
            speed -= (speed / 100)
            if (speed > 0)
                speed -= .02;
            else if (speed < 0)
                speed += .02;
            return speed;
        }

        function addGravity() {
            carYSpeed += GRAVITY;
            ballYSpeed += GRAVITY;
        }

        function drawEverything() {
            colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'lightgreen');
            colorCircle(ballXPos, ballYPos, BALL_RADIUS, 'black');
            colorRect(carXPos, carYPos, CAR_WIDTH, CAR_HEIGHT, 'black');
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