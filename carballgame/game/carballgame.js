const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH  = 800;
const FRAMES_PER_SECOND = 60;
const GRAVITY    = 0.3;

let gameMode = "keepyUps";
let canvasContext;

let input = new Input();
let score = new Score();
let menu  = new Menu();

let playerCount;

let player;
let ball;
let net;

let gameObjects = [];

class CarBallGame {
    Run() {
        playerCount = 2;
        window.onload;

        CarBallGame.init();

        this.canvas = document.getElementById('canvas');
        canvasContext = this.canvas.getContext('2d');

        setInterval(function () {
            CarBallGame.moveEverything();
            CarBallGame.drawEverything();
        }, 1000 / FRAMES_PER_SECOND);

        window.addEventListener("keydown", CarBallGame.onKeyDown);
        window.addEventListener("keyup", CarBallGame.onKeyUp);
    }

    static init() {
        score.reset();
        gameObjects = [];

        //Init players and ball

        player = new Car();
        player.init(40 ,CANVAS_HEIGHT, 'red', KEYCODE_w, KEYCODE_a, KEYCODE_s, KEYCODE_d);
        gameObjects.push(player);
        if (playerCount >= 2) {
            player = new Car();
            player.init(CANVAS_WIDTH - 80, CANVAS_HEIGHT, 'blue', KEYCODE_up_arrow, KEYCODE_left_arrow, KEYCODE_down_arrow, KEYCODE_right_arrow);
            gameObjects.push(player);
        }
        if (playerCount >= 3) {
            player = new Car();
            player.init(100, CANVAS_HEIGHT, 'red', KEYCODE_i, KEYCODE_j, KEYCODE_k, KEYCODE_l);
            gameObjects.push(player);
        }
        if (playerCount >= 4) {
            player = new Car();
            player.init(CANVAS_WIDTH - 140, CANVAS_HEIGHT, 'blue', KEYCODE_numpad_8, KEYCODE_numpad_4, KEYCODE_numpad_5, KEYCODE_numpad_6);
            gameObjects.push(player);
        }

        switch (gameMode) {
            case "volleyBall":
                net = new Net;
                gameObjects.push(net);
                break;
        }
        switch (gameMode) {
            case "keepyUps":
            case "volleyBall":
                ball = new Ball();
                ball.init(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, score, "black");
                gameObjects.push(ball);
                break;
            case "dodgeBall":
                ball = new Ball();
                ball.init((CANVAS_WIDTH / 2 - CANVAS_WIDTH / 4), CANVAS_HEIGHT / 2, score, "red");
                gameObjects.push(ball);
                ball = new Ball();
                ball.init((CANVAS_WIDTH / 2 + CANVAS_WIDTH / 4), CANVAS_HEIGHT / 2, score, "blue");
                gameObjects.push(ball);
                break;
        }
    }

    static onKeyDown(event) {
        input.onKeyDown(event);
    }

    static onKeyUp(event) {
        input.onKeyUp(event);
    }

    buttonClick(button, gameModeButton) {
        if (gameModeButton) {
            gameMode = button;
        }
        else {
            playerCount = button;
        }
        CarBallGame.init();
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
            case "gameOver":
                menu.drawGameOver();
                break;
        }
    }
}

CarBallGameInst = new CarBallGame();