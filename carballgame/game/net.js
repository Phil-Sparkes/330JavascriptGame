class Net  extends GameObject {
    constructor() {
        super();
        this.WIDTH = 20;
        this.HEIGHT = 150;
        this.xPos = CANVAS_WIDTH/2;
        this.yPos = CANVAS_HEIGHT - this.HEIGHT;
        this.colour = "black";
        this.isBall = false;
    }
    draw(colourRect) {
        colourRect(this.xPos, this.yPos, this.WIDTH, this.HEIGHT, this.colour);
    }
}