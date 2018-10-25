class Ball {
    Init(x,y) {
        this.xPos = 0;
        this.yPos = 0;

        this.xPos = x;
        this.yPos = y;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.RADIUS = 10;
        this.MAX_SPEED = 15;
    }
    Clamp(CANVAS_WIDTH, CANVAS_HEIGHT, score) {
        // clamp ball position
        if (this.xPos < 0) {
            this.xSpeed = -this.xSpeed;
            this.xPos = 0;
        }
        else if (this.xPos > CANVAS_WIDTH - this.RADIUS) {
            this.xSpeed = -this.xSpeed;
            this.xPos = CANVAS_WIDTH - this.RADIUS;
        }
        if (this.yPos < 0) {
            this.ySpeed = -this.ySpeed;
            this.yPos = 0;
        }
        else if (this.yPos > CANVAS_HEIGHT - this.RADIUS) {
            this.ySpeed = -this.ySpeed;
            this.yPos = CANVAS_HEIGHT - this.RADIUS;
            score = 0;
        }
        return score;
    }
    Update(GRAVITY, slowAfterTime) {

        // apply gravity
        this.ySpeed += GRAVITY;

        // slow after time
        this.xSpeed = slowAfterTime(this.xSpeed);
        this.ySpeed = slowAfterTime(this.ySpeed);

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
    Draw(colorCircle) {
        colorCircle(this.xPos, this.yPos, this.RADIUS, 'black');
    }
}