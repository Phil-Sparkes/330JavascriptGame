class Player extends GameObject {
    constructor() {
        super();
        this.ACCELERATION = 1;
        this.WIDTH = 40;
        this.HEIGHT = 40;
        this.MAX_SPEED = 10;
        this.JUMP_FORCE = 10;
        this.SLOWDIVISION = 20;
        this.SLOWCONST = 0.02;
    }
    init(x,y, colour, upKey, leftKey, downKey, rightKey) {
        this.xPos = x;
        this.yPos = y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.canJump = true;

        this.colour = colour;
        this.isBall = false;
        this.isPlayer = true;

        this.upKey    = upKey;
        this.leftKey  = leftKey;
        this.downKey  = downKey;
        this.rightKey = rightKey;
    }
    update() {
        // get input
        if (input.keyDict[this.leftKey]){
            this.xSpeed -= this.ACCELERATION;
        }
        if (input.keyDict[this.downKey]){
            this.ySpeed += this.ACCELERATION;
        }
        if (input.keyDict[this.rightKey]){
            this.xSpeed += this.ACCELERATION;
        }
        if (input.keyDict[this.upKey] && this.canJump) {
            this.ySpeed -= this.JUMP_FORCE;
            this.canJump = false;
        }

        // apply dampening
        this.slowAfterTime();

        // Apply gravity
        this.ySpeed += GRAVITY;

        // Clamp player speed
        if (this.xSpeed > this.MAX_SPEED)
            this.xSpeed = this.MAX_SPEED;
        else if (this.xSpeed < -this.MAX_SPEED)
            this.xSpeed = -this.MAX_SPEED;
        if (this.ySpeed > this.MAX_SPEED)
            this.ySpeed = this.MAX_SPEED;
        else if (this.ySpeed < -this.MAX_SPEED)
            this.ySpeed = -this.MAX_SPEED;

        // apply movement due to speed
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }

    clamp() {
        // clamp player position to screen
        if (this.xPos < 0) {
            this.xPos = 0;
            this.xSpeed = 0;
        }
        else if (this.xPos > CANVAS_WIDTH - this.WIDTH) {
            this.xPos = CANVAS_WIDTH - this.WIDTH;
            this.xSpeed = 0;
        }
        if (this.yPos < 0) {
            this.yPos = 0;
            this.ySpeed = 0;
        }
        else if (this.yPos > CANVAS_HEIGHT - this.HEIGHT) {
            this.yPos = CANVAS_HEIGHT - this.HEIGHT;
            this.ySpeed = 0;
            // when player is on floor set can jump to true
            this.canJump = true;
        }
    }
    draw() {
        colorRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }

    slowAfterTime() {
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