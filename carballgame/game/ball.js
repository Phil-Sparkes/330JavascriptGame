class Ball  extends GameObject {
    constructor() {
        super();
    }
    init(x,y, score, colour) {
        this.xPos = 0;
        this.yPos = 0;

        this.xPos = x +  Math.floor((Math.random() * 10) -5);
        this.yPos = y;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.WIDTH = 20;
        this.HEIGHT = 20;
        this.MAX_SPEED = 15;
        this.SLOWDIVISION = 100;
        this.SLOWCONST = 0.02;

        this.isBall = true;
        this.score  = score;
        this.colour = colour;
    }
    clamp() {
        // clamp ball position
        if (this.xPos < 0) {
            this.xSpeed = -this.xSpeed;
            this.xPos = 0;
        }
        else if (this.xPos > CANVAS_WIDTH - this.WIDTH) {
            this.xSpeed = -this.xSpeed;
            this.xPos = CANVAS_WIDTH - this.WIDTH;
        }
        if (this.yPos < 0) {
            this.ySpeed = -this.ySpeed;
            this.yPos = 0;
        }
        else if (this.yPos > CANVAS_HEIGHT - this.HEIGHT) {
            this.ySpeed = -this.ySpeed;
            this.yPos = CANVAS_HEIGHT - this.HEIGHT;

            switch (gameMode) {
                case "keepyUps":
                    this.score.ballHitFloor(true);
                    break;
                case "volleyBall":
                    if (this.xPos > CANVAS_WIDTH/2) {
                        this.score.ballHitFloor(true);
                        this.reset((CANVAS_WIDTH/2 + CANVAS_WIDTH/4), CANVAS_HEIGHT/2);
                    }
                    else {
                        this.score.ballHitFloor(false);
                        this.reset((CANVAS_WIDTH/2 - CANVAS_WIDTH/4), CANVAS_HEIGHT/2);
                    }
                    break;
            }
        }
    }
    update() {

        this.SlowAfterTime();

        // apply gravity
        this.ySpeed += GRAVITY;

        // clamp to max speed
        if (this.xSpeed >  this.MAX_SPEED)
            this.xSpeed =  this.MAX_SPEED;
        if (this.xSpeed < -this.MAX_SPEED)
            this.xSpeed = -this.MAX_SPEED;
        if (this.ySpeed >  this.MAX_SPEED)
            this.ySpeed =  this.MAX_SPEED;
        if (this.ySpeed < -this.MAX_SPEED)
            this.ySpeed = -this.MAX_SPEED;

        // apply movement
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;

    }
    reset(x, y) {
        this.xPos =  x +  Math.floor((Math.random() * 10) -5);
        this.yPos = y;
        this.xSpeed = 0;
        this.ySpeed = -10;
    }
    draw() {
        colorRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }


    SlowAfterTime() {
        this.xSpeed -= (this.xSpeed / this.SLOWDIVISION);
        this.ySpeed -= (this.ySpeed / this.SLOWDIVISION);

        if (this.xSpeed > 0)
            this.xSpeed -= this.SLOWCONST;
        else if (this.xSpeed < 0)
            this.xSpeed += this.SLOWCONST;

        if (this.ySpeed > 0)
            this.ySpeed -= this.SLOWCONST;
        else if (this.ySpeed < 0)
            this.ySpeed += this.SLOWCONST;
    }
}