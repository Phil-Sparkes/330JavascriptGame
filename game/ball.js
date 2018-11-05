class Ball  extends GameObject {
    constructor() {
        super();
        this.WIDTH = 20;
        this.HEIGHT = 20;
        this.MAX_SPEED = 15;
        this.SLOWDIVISION = 100;
        this.SLOWCONST = 0.02;
    }
    init(x,y, colour) {
        this.xPos = 0;
        this.yPos = 0;

        // random deviation to change spawn position slightly
        this.xPos = x - this.WIDTH/2 + Math.floor((Math.random() * 10) -5);
        this.yPos = y;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.isBall = true;
        this.colour = colour;
    }
    clamp() {
        // clamp ball position to screen
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
            // handle hit floor event
            GameModeManager.ballHitFloor(this);
        }
    }
    update() {

        // apply dampening
        this.SlowAfterTime();

        // apply gravity
        this.ySpeed += GRAVITY;

        // clamp speed to max speed
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
        let upwardsForce = -10;
        // random deviation to change spawn position slightly
        this.xPos =  x - this.WIDTH/2 +  Math.floor((Math.random() * 10) -5);
        this.yPos = y;
        this.xSpeed = 0;
        // apply upwards force so ball doesn't fall instantly
        this.ySpeed = upwardsForce;
    }
    draw() {
        colorRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }


    SlowAfterTime() {
        // apply dampening
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