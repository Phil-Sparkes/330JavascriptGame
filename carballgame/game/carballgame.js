const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH  = 800;

const GRAVITY    = 0.3;

class CarBallGame {

    Run() {

        var canvasContext;
        var canvas;

        var input;
        var player1;
        var player2;
        var theBall;

        var score = 0;
        var highScore = 0;

        var gameObjects = [];

        window.onload = function () {
            //Init input
            input = new Input;
            //Init players and ball
            player1 = new Car;
            player1.Init(40 ,CANVAS_HEIGHT, 'red');
            gameObjects.push(player1);

            player2 = new Car;
            player2.Init(CANVAS_WIDTH - 80 ,CANVAS_HEIGHT, 'blue');
            gameObjects.push(player2);

            theBall = new Ball;
            theBall.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
            gameObjects.push(theBall);

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
            input.onKeyDown(event);
        }
        function onKeyUp(event) {
            input.onKeyUp(event);
        }
        function moveEverything() {

            // Update player and ball
            player1.Update(input.keyW, input.keyA, input.keyS, input.keyD, GRAVITY);
            player2.Update(input.keyUpArrow, input.keyLeftArrow, input.keyDownArrow, input.keyRightArrow, GRAVITY);
            theBall.Update(GRAVITY);

            // check collisions
            if (checkCollision(player1, theBall.xPos - theBall.RADIUS, theBall.yPos - theBall.RADIUS, theBall.RADIUS * 2, theBall.RADIUS * 2))
                collisionResult(player1, theBall);

            if (checkCollision(player2, theBall.xPos - theBall.RADIUS, theBall.yPos - theBall.RADIUS, theBall.RADIUS * 2, theBall.RADIUS * 2))
                collisionResult(player2, theBall);
            if (checkCollision(player1, player2.xPos, player2.yPos, player2.WIDTH, player2.HEIGHT))
                collisionResult(player1, player2);

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

        function collisionResult(object1, object2) {
            let angleX;
            let angleY;

            angleX = (object1.xPos + object1.WIDTH / 2) - object2.xPos;
            angleY = (object1.yPos + object1.HEIGHT / 2) - object2.yPos;

            if (object1.isPlayer && !object2.isPlayer) {
                object2.xSpeed = -angleX;
                object2.ySpeed = -angleY;
                score++;
            }
            else if (!object1.isPlayer && object2.isPlayer) {
                object1.xSpeed = angleX;
                object1.ySpeed = angleY;
                score++;
            }
            else {
                object2.xSpeed = -angleX;
                object2.ySpeed = -angleY;
                object1.xSpeed = angleX;
                object1.ySpeed = angleY;
            }
                if (score > highScore)
                    highScore = score;
            return;
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