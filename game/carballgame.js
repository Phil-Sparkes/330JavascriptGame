const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH  = 800;
const CANVAS_YCENTER = CANVAS_HEIGHT/2;
const CANVAS_XCENTER  = CANVAS_WIDTH/2;


const FRAMES_PER_SECOND = 60;
const GRAVITY    = 0.3;
const TEAM1COLOUR = "red";
const TEAM2COLOUR = "blue";
const DEFAULTCOLOUR = "black";

let gameMode = "startScreen";
let canvasContext;

let input = new Input();
let score = new Score();

let playerCount;

let player;
let ball;
let net;

let gameObjects = [];

let backgroundImage = new Image();

class CarBallGame {
    Run() {
        playerCount = 2;
        window.onload;

        CarBallGame.init();

        this.canvas = document.getElementById('canvas');
        canvasContext = this.canvas.getContext('2d');

        make_background();

        function make_background()
        {
            backgroundImage.src = 'images/background.png';
            backgroundImage.onload = function(){
                canvasContext.drawImage(backgroundImage, 0, 0);
            }
        }

        // main loop
        setInterval(function () {
            CarBallGame.moveEverything();
            CarBallGame.drawEverything();
        }, 1000 / FRAMES_PER_SECOND);

        window.addEventListener("keydown", CarBallGame.onKeyDown);
        window.addEventListener("keyup", CarBallGame.onKeyUp);
    }

    static init() {
        // Reset score and game objects
        score.reset();
        gameObjects = [];

        let playerDisplacement = 50;
        // Initialise players
        player = new Car();
        player.init(playerDisplacement ,CANVAS_HEIGHT, TEAM1COLOUR, KEYCODE_w, KEYCODE_a, KEYCODE_s, KEYCODE_d);
        gameObjects.push(player);
        if (playerCount >= 2) {
            player = new Car();
            player.init(CANVAS_WIDTH - player.WIDTH - playerDisplacement, CANVAS_HEIGHT, TEAM2COLOUR, KEYCODE_up_arrow, KEYCODE_left_arrow, KEYCODE_down_arrow, KEYCODE_right_arrow);
            gameObjects.push(player);
        }
        if (playerCount >= 3) {
            player = new Car();
            player.init(playerDisplacement*2, CANVAS_HEIGHT, TEAM1COLOUR, KEYCODE_i, KEYCODE_j, KEYCODE_k, KEYCODE_l);
            gameObjects.push(player);
        }
        if (playerCount >= 4) {
            player = new Car();
            player.init(CANVAS_WIDTH  - player.WIDTH - playerDisplacement*2, CANVAS_HEIGHT, TEAM2COLOUR, KEYCODE_numpad_8, KEYCODE_numpad_4, KEYCODE_numpad_5, KEYCODE_numpad_6);
            gameObjects.push(player);
        }

        // Initialise other game objects depending on game mode
        switch (gameMode) {
            case "footBall":
                net = new Net;
                net.init(0, TEAM1COLOUR);
                gameObjects.push(net);
                net = new Net;
                net.init(CANVAS_WIDTH - net.WIDTH, TEAM2COLOUR);
                gameObjects.push(net);
                ball = new Ball();
                ball.init(CANVAS_XCENTER, CANVAS_YCENTER, score, DEFAULTCOLOUR);
                gameObjects.push(ball);
                break;
            case "volleyBall":
                net = new Net;
                net.init(CANVAS_XCENTER - net.WIDTH/2, DEFAULTCOLOUR);
                gameObjects.push(net);
            case "keepyUps":
                ball = new Ball();
                ball.init(CANVAS_XCENTER, CANVAS_YCENTER, score, DEFAULTCOLOUR);
                gameObjects.push(ball);
                break;
            case "dodgeBall":
                let ballXDisplacement = 200;
                ball = new Ball();
                ball.init((CANVAS_XCENTER - ballXDisplacement), CANVAS_YCENTER, score, TEAM1COLOUR);
                gameObjects.push(ball);
                ball = new Ball();
                ball.init((CANVAS_XCENTER + ballXDisplacement), CANVAS_YCENTER, score, TEAM2COLOUR);
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

    static buttonClick(buttonValue, gameModeButton) {
        if (gameModeButton) {
            gameMode = buttonValue;
        }
        else {
            playerCount = buttonValue;
            gameMode = "startScreen";
        }
        CarBallGame.init();
    }


    static moveEverything() {
        let i;
        let x;
        // Loop through all game objects
        for (i = 0; i<gameObjects.length; i++) {
            // Update
            gameObjects[i].update();
            // check collisions between all objects
            for (x = i + 1; x < gameObjects.length; x++) {
                if (CarBallGame.checkCollision(gameObjects[i], gameObjects[x]))
                    CarBallGame.collisionResult(gameObjects[i], gameObjects[x]);
            }
            // Clamp objects to screen
            gameObjects[i].clamp();
        }
    }

    // Collision detection found at https://stackoverflow.com/questions/2440377/javascript-collision-detection
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

        // calculate angle objects will travel
        angleX = (object1.xPos + object1.WIDTH  / 2) - (object2.xPos + object2.WIDTH  / 2);
        angleY = (object1.yPos + object1.HEIGHT / 2) - (object2.yPos + object2.HEIGHT / 2);


        // check if only one of the objects is a ball
        if (object1.isBall && !object2.isBall) {
            object1.xSpeed = angleX;
            object1.ySpeed = angleY;
            score.ballHitObject(object1, object2);
        }
        else if (!object1.isBall && object2.isBall) {
            object2.xSpeed = -angleX;
            object2.ySpeed = -angleY;
            score.ballHitObject(object2, object1);
            }
        else {
            // otherwise both objects are acted upon
            object2.xSpeed = -angleX;
            object2.ySpeed = -angleY;
            object1.xSpeed = angleX;
            object1.ySpeed = angleY;
        }
    }


    static drawEverything() {
        let i;
        // Draw Background
        canvasContext.drawImage(backgroundImage, 0, 0);
        // Draw Objects
        for (i=0; i<gameObjects.length; i++) {
            gameObjects[i].draw();
        }
        // Draw Score
        score.draw();
        switch (gameMode) {
            case "startScreen":
                TextToScreen.drawControls(playerCount);
                break;
            case "gameOver":
                TextToScreen.drawGameOver();
                break;
        }
    }
}

CarBallGameInst = new CarBallGame();