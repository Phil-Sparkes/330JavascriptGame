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

    ballHitObject(ball, object) {
        switch (gameMode) {
            case "keepyUps":
                this.score++;
                this.update();
                break;
            case "footBall":
                if (!(object.isPlayer)) {
                    ball.reset(CANVAS_XCENTER, CANVAS_YCENTER);
                    if (object.colour === TEAM2COLOUR){
                        this.T1Score++;
                        this.checkForWin();
                    }
                    else {
                        this.T2Score++;
                        this.checkForWin();
                    }
                }
            break;
            case "dodgeBall":
                if (!(ball.colour === object.colour)) {
                    ball.reset(CANVAS_XCENTER, CANVAS_YCENTER);
                    if (ball.colour === TEAM1COLOUR) {
                        this.T1Score++;
                        this.checkForWin()
                    }
                    else {
                        this.T2Score++;
                        this.checkForWin()
                    }
                }
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
                    this.T1Score++;
                }
                else {
                    this.T2Score++;
                }
                this.checkForWin();
                break;
        }
    }


    update() {
        if (this.score >= this.highScore)
            this.highScore = this.score;
    }

    draw() {
        // Draw text
        switch (gameMode) {
            case "keepyUps":
                displayText("Score: " + this.score.toFixed(0), this.scoreXPos, this.scoreYPos, DEFAULTCOLOUR);
                displayText("HighScore: " + this.highScore.toFixed(0), this.highScoreXPos, this.highScoreYPos, DEFAULTCOLOUR);
                break;
            case "footBall":
            case "volleyBall":
            case "dodgeBall":
            case "gameOver":
                displayText("SCORE: " + this.T1Score.toFixed(0), this.team1ScoreXPos, this.scoreYPos, TEAM1COLOUR);
                displayText("SCORE: " + this.T2Score.toFixed(0), this.team2ScoreXPos, this.scoreYPos, TEAM2COLOUR);
                break;
        }
    }
    reset() {
        this.score = 0;
        this.T1Score = 0;
        this.T2Score = 0;
        this.highScore = 0;
    }
}