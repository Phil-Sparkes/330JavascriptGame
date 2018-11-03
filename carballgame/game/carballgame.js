const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH  = 800;
const FRAMES_PER_SECOND = 60;
const GRAVITY    = 0.3;

let gameMode = "mainMenu";
let canvasContext;

let input = new Input();
let score = new Score();
let menu  = new Menu();

let player1;
let player2;
let theBall;
let net;
let gameObjects = [];

class CarBallGame {
    Run() {
        window.onload;

        CarBallGame.init();

        this.canvas = document.getElementById('canvas');
        canvasContext = this.canvas.getContext('2d');

        setInterval(function () {
            CarBallGame.moveEverything();
            CarBallGame.drawEverything();
            CarBallGame.checkGameModeChange();
        }, 1000 / FRAMES_PER_SECOND);

        window.addEventListener("keydown", CarBallGame.onKeyDown);
        window.addEventListener("keyup", CarBallGame.onKeyUp);
    }

    static init() {
        score.reset();
        gameObjects = [];

        //Init players and ball
        player1 = new Car();
        player1.init(40 ,CANVAS_HEIGHT, 'red');
        gameObjects.push(player1);

        player2 = new Car();
        player2.init(CANVAS_WIDTH - 80 ,CANVAS_HEIGHT, 'blue');
        gameObjects.push(player2);

        switch (gameMode) {
            case "volleyBall":
                net = new Net;
                gameObjects.push(net);
                break;
        }
        switch (gameMode) {
            case "keepyUps":
            case "volleyBall":
                theBall = new Ball();
                theBall.init(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, score, "black");
                gameObjects.push(theBall);
                break;
            case "dodgeBall":
                theBall = new Ball();
                theBall.init((CANVAS_WIDTH / 2 - CANVAS_WIDTH / 4), CANVAS_HEIGHT / 2, score, player1.colour);
                gameObjects.push(theBall);
                theBall = new Ball();
                theBall.init((CANVAS_WIDTH / 2 + CANVAS_WIDTH / 4), CANVAS_HEIGHT / 2, score, player2.colour);
                gameObjects.push(theBall);
                break;
        }
    }

    static onKeyDown(event) {
        input.onKeyDown(event);
        player1.updateInput(input.keyDict[KEYCODE_w], input.keyDict[KEYCODE_a], input.keyDict[KEYCODE_s], input.keyDict[KEYCODE_d]);
        player2.updateInput(input.keyDict[KEYCODE_up_arrow], input.keyDict[KEYCODE_left_arrow], input.keyDict[KEYCODE_down_arrow], input.keyDict[KEYCODE_right_arrow]);
    }

    static onKeyUp(event) {
        input.onKeyUp(event);
        player1.updateInput(input.keyDict[KEYCODE_w], input.keyDict[KEYCODE_a], input.keyDict[KEYCODE_s], input.keyDict[KEYCODE_d]);
        player2.updateInput(input.keyDict[KEYCODE_up_arrow], input.keyDict[KEYCODE_left_arrow], input.keyDict[KEYCODE_down_arrow], input.keyDict[KEYCODE_right_arrow]);
    }

    static checkGameModeChange() {
        if (gameMode === "mainMenu") {
            if (input.keyDict[KEYCODE_1]) {
                gameMode = "volleyBall";
                CarBallGame.init();
            }
            else if (input.keyDict[KEYCODE_2]) {
                gameMode = "keepyUps";
                CarBallGame.init();
            }
            else if (input.keyDict[KEYCODE_3]) {
                gameMode = "dodgeBall";
                CarBallGame.init();
            }
        }
        else if (input.keyDict[KEYCODE_escape]) {
            gameMode = "mainMenu";
            CarBallGame.init();
        }
    }

    static moveEverything() {
        let i;
        let x;
        for (i = 0; i<gameObjects.length; i++) {
            // Update
            gameObjects[i].update();
            // check collisions
            for (x = i + 1; x < gameObjects.length; x++) {
                if (CarBallGame.checkCollision(gameObjects[i], gameObjects[x]))
                    CarBallGame.collisionResult(gameObjects[i], gameObjects[x]);
            }
            // Clamp objects to screen
            gameObjects[i].clamp();
        }
    }

    // https://stackoverflow.com/questions/2440377/javascript-collision-detection
    static checkCollision(a, b) {
        return !(
            ((a.yPos + a.HEIGHT) < (b.yPos)) ||
            (a.yPos > (b.yPos + b.HEIGHT)) ||
            ((a.xPos + a.WIDTH) < b.xPos) ||
            (a.xPos > (b.xPos + b.WIDTH))
        );
    }

    static collisionResult(object1, object2) {
        let angleX;
        let angleY;

        angleX = (object1.xPos + object1.WIDTH  / 2) - (object2.xPos + object2.WIDTH  / 2);
        angleY = (object1.yPos + object1.HEIGHT / 2) - (object2.yPos + object2.HEIGHT / 2);

        if (object1.isBall && !object2.isBall) {
            object1.xSpeed = angleX;
            object1.ySpeed = angleY;
            score.playerHitBall();
            switch (gameMode) {
                case "dodgeBall":
                    if (!(object1.colour === object2.colour)) {
                        object1.reset(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                        if (object1.colour === "red") {
                            score.P1Score++
                        }
                        else {
                            score.P2Score++
                        }
                    }
                    break;
            }
        }
        else if (!object1.isBall && object2.isBall) {
            object2.xSpeed = -angleX;
            object2.ySpeed = -angleY;
            score.playerHitBall();
            switch (gameMode) {
                case "dodgeBall":
                    if (!(object1.colour === object2.colour)) {
                        object2.reset(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                        if (object2.colour === "red") {
                            score.P1Score++
                        }
                        else {
                            score.P2Score++
                        }
                    }
                    break;
            }
        }
        else {
            object2.xSpeed = -angleX;
            object2.ySpeed = -angleY;
            object1.xSpeed = angleX;
            object1.ySpeed = angleY;
        }
    }

    static drawEverything() {
        let i;
        // Draw Background
        colorRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'lightgreen');
        // Draw Objects
        for (i=0; i<gameObjects.length; i++) {
            gameObjects[i].draw();
        }
        // Draw Score
        score.draw();
        switch (gameMode) {
            case "mainMenu":
                menu.drawMainMenu();
                break;
            case "gameOver":
                menu.drawGameOver();
                break;
        }
    }
}

CarBallGameInst = new CarBallGame();