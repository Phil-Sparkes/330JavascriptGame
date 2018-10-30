class Score {
    constructor() {
        this.score = 0;
        this.highScore = 0;

        this.scoreXPos = CANVAS_WIDTH/2;
        this.scoreYPos =  75;
        this.scoreColour = "red";

        this.highScoreXPos = CANVAS_WIDTH/2;
        this.highScoreYPos = 35;
        this.highScoreColour = "red";


    }
    increment(){
        this.score++;
    }
    hitFloor(){
        this.score = 0;
    }
    update(){
        if (this.score >= this.highScore)
            this.highScore = this.score;
    }
    draw(displayText){
        // Draw text
        displayText("Score: " + this.score.toFixed(0), this.scoreXPos , this.scoreYPos, this.scoreColour);
        displayText("HighScore: " + this.highScore.toFixed(0), this.highScoreXPos , this.highScoreYPos, this.highScoreColour);
    }
}