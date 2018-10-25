class Car {
    Init(x,y, colour) {
        this.xPos = x;
        this.yPos = y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.canJump = true;

        this.ACCELERATION = 1;
        this.WIDTH = 40;
        this.HEIGHT = 40;
        this.MAX_SPEED = 10;
        this.JUMP_FORCE = 10;

        this.colour = colour;

    }
    Update(leftKey, downKey, rightKey, GRAVITY, slowAfterTime) {
        if (leftKey){
            this.xSpeed -= this.ACCELERATION;
        }
        if (downKey){
            this.ySpeed += this.ACCELERATION;
        }
        if (rightKey){
            this.xSpeed += this.ACCELERATION;
        }

        this.ySpeed += GRAVITY;

        this.xSpeed = slowAfterTime(this.xSpeed);
        this.ySpeed = slowAfterTime(this.ySpeed);

        // Clamp car speed
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

    Clamp(CANVAS_WIDTH, CANVAS_HEIGHT) {
        // clamp car position
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
            this.canJump = true;
        }
    }
    Draw(colorRect) {
        colorRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }
}