class Score {
    constructor() {
        this.score = 0;
        this.P1Score = 0;
        this.P2Score = 0;
        this.highScore = 0;

        this.scoreXPos = CANVAS_WIDTH / 2;
        this.scoreYPos = 75;

        this.scoreColour = "red";
        this.highScoreColour = "red";

        this.p1Colour = "red";
        this.p2Colour = "blue";

        this.highScoreXPos = CANVAS_WIDTH / 2;
        this.highScoreYPos = 35;


    }

    playerHitBall() {
        switch (gameMode) {
            case "keepyUps":
                this.score++;
                break;
        }
    }

    ballHitFloor(player1) {
        switch (gameMode) {
            case "keepyUps":
                this.score = 0;
                break;
            case "volleyBall":
                if (player1) {
                    this.P1Score++;
                }
                else {
                    this.P2Score++;
                }
                break;
        }
    }


    update() {
        if (this.score >= this.highScore)
            this.highScore = this.score;
    }

    draw(displayText) {
        // Draw text
        switch (gameMode) {
            case "keepyUps":
                displayText("Score: " + this.score.toFixed(0), this.scoreXPos, this.scoreYPos, this.scoreColour);
                displayText("HighScore: " + this.highScore.toFixed(0), this.highScoreXPos, this.highScoreYPos, this.highScoreColour);
                break;
            case "volleyBall":
            case "dodgeBall":
                displayText("P1: " + this.P1Score.toFixed(0), this.scoreXPos - 300, this.scoreYPos, this.p1Colour);
                displayText("P2: " + this.P2Score.toFixed(0), this.scoreXPos + 300, this.scoreYPos, this.p2Colour);
                break;
        }
    }
}