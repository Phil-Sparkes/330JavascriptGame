class Score {
    constructor() {
        this.score = 0;
        this.T1Score = 0;
        this.T2Score = 0;
        this.highScore = 0;
        this.scoreToWin = 7;

        this.scoreXPos = CANVAS_XCENTER;
        this.scoreYPos = 75;

        this.highScoreXPos = CANVAS_XCENTER;
        this.highScoreYPos = 35;

        this.team1ScoreXPos = CANVAS_XCENTER - 300;
        this.team2ScoreXPos = CANVAS_XCENTER + 300;
    }

    checkForWin() {
        if (this.T1Score >= this.scoreToWin || this.T2Score >= this.scoreToWin) {
            gameMode = "gameOver";
        }
    }


    update() {
        if (this.score >= this.highScore)
            this.highScore = this.score;
    }

    reset() {
        this.score = 0;
        this.T1Score = 0;
        this.T2Score = 0;
        this.highScore = 0;
    }
}