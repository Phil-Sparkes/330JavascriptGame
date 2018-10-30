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
        var gameObjects = [];

        var score;

        var i;
        var x;

        window.onload = function () {
            //Init input and score
            input = new Input;
            score = new Score;

            //Init players and ball
            player1 = new Car;
            player1.init(40 ,CANVAS_HEIGHT, 'red');
            gameObjects.push(player1);

            player2 = new Car;
            player2.init(CANVAS_WIDTH - 80 ,CANVAS_HEIGHT, 'blue');
            gameObjects.push(player2);

            theBall = new Ball;
            theBall.init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, score);
            gameObjects.push(theBall);


            canvas = document.getElementById('canvas');
            canvasContext = canvas.getContext('2d');

            var framesPerSecond = 60;
            setInterval(function () {
                moveEverything();
                score.update();
                drawEverything();

            }, 1000 / framesPerSecond);
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("keyup", onKeyUp);
        }

        function onKeyDown(event) {
            input.onKeyDown(event);
            player1.updateInput(input.keyW, input.keyA, input.keyS, input.keyD);
            player2.updateInput(input.keyUpArrow, input.keyLeftArrow, input.keyDownArrow, input.keyRightArrow);
        }
        function onKeyUp(event) {
            input.onKeyUp(event);
            player1.updateInput(input.keyW, input.keyA, input.keyS, input.keyD);
            player2.updateInput(input.keyUpArrow, input.keyLeftArrow, input.keyDownArrow, input.keyRightArrow);
        }
        function moveEverything() {

            for (i = 0; i<gameObjects.length; i++) {

                // Updatde
                gameObjects[i].update();

                // check collisions
                for (x = i + 1; x < gameObjects.length; x++) {
                    if (checkCollision(gameObjects[i], gameObjects[x]))
                        collisionResult(gameObjects[i], gameObjects[x]);
                }

                // Clamp objects to screen
                gameObjects[i].clamp();
            }
        }

        // https://stackoverflow.com/questions/2440377/javascript-collision-detection
        function checkCollision(a, b) {
            return !(
                ((a.yPos + a.HEIGHT) < (b.yPos)) ||
                (a.yPos > (b.yPos + b.HEIGHT)) ||
                ((a.xPos + a.WIDTH) < b.xPos) ||
                (a.xPos > (b.xPos + b.WIDTH))
            );
        }

        function collisionResult(object1, object2) {
            let angleX;
            let angleY;

            angleX = (object1.xPos + object1.WIDTH  / 2) - (object2.xPos + object2.WIDTH  / 2);
            angleY = (object1.yPos + object1.HEIGHT / 2) - (object2.yPos + object2.HEIGHT / 2);

            if (object1.isPlayer && !object2.isPlayer) {
                object2.xSpeed = -angleX;
                object2.ySpeed = -angleY;
                score.increment();
            }
            else if (!object1.isPlayer && object2.isPlayer) {
                object1.xSpeed = angleX;
                object1.ySpeed = angleY;
                score.increment();
            }
            else {
                object2.xSpeed = -angleX;
                object2.ySpeed = -angleY;
                object1.xSpeed = angleX;
                object1.ySpeed = angleY;
            }
        }

        function drawEverything() {
            // Draw Background
            colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'lightgreen');
            // Draw Objects
            for (i=0; i<gameObjects.length; i++) {
                gameObjects[i].draw(colorRect);
            }
            // Draw Score
            score.draw(displayText);
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