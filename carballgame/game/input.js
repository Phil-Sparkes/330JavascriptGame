class Input {
    constructor()
    {
        this.keyW = false;
        this.keyA = false;
        this.keyS = false;
        this.keyD = false;

        this.keyUpArrow = false;
        this.keyLeftArrow = false;
        this.keyDownArrow = false;
        this.keyRightArrow = false;
    }
    onKeyDown(event) {
        //w
        if (event.keyCode == 87) {
            this.keyW = true;
        }
        //a
        if (event.keyCode == 65) {
            this.keyA = true;
        }
        //s
        if (event.keyCode == 83) {
            this.keyS = true;
        }
        //d
        if (event.keyCode == 68) {
            this.keyD = true;
        }
        //up
        if (event.keyCode == 38) {
            this.keyUpArrow = true;
        }
        //left
        if (event.keyCode == 37) {
            this.keyLeftArrow = true;
        }
        //down
        if (event.keyCode == 40) {
            this.keyDownArrow = true;
        }
        //right
        if (event.keyCode == 39) {
            this.keyRightArrow = true;
        }
    }

    onKeyUp(event) {
        //w
        if (event.keyCode == 87) {
            this.keyW = false;
        }
        //a
        if (event.keyCode == 65) {
            this.keyA = false;
        }
        //s
        if (event.keyCode == 83) {
            this.keyS = false;
        }
        //d
        if (event.keyCode == 68) {
            this.keyD = false;
        }
        //up
        if (event.keyCode == 38) {
            this.keyUpArrow = false;
        }
        //left
        if (event.keyCode == 37) {
            this.keyLeftArrow = false;
        }
        //down
        if (event.keyCode == 40) {
            this.keyDownArrow = false;
        }
        //right
        if (event.keyCode == 39) {
            this.keyRightArrow = false;
        }
    }
}

