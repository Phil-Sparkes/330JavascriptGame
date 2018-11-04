class Net  extends GameObject {
    constructor() {
        super();
        this.WIDTH = 20;
        this.HEIGHT = 150;
        this.xPos = CANVAS_XCENTER;
        this.yPos = CANVAS_HEIGHT - this.HEIGHT;
        this.colour = DEFAULTCOLOUR;
        this.isBall = false;
        this.isPlayer = false;
    }
    init(x, colour) {
        this.xPos = x;
        this.colour = colour;
    }
    draw() {
        colorRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }
}