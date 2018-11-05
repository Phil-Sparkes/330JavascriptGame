class GameModeManager {
    static spawnObjects() {
        switch (gameMode) {
            case "footBall":
                net = new Net;
                net.init(0, TEAM1COLOUR);
                gameObjects.push(net);
                net = new Net;
                net.init(CANVAS_WIDTH - net.WIDTH, TEAM2COLOUR);
                gameObjects.push(net);
                ball = new Ball();
                ball.init(CANVAS_XCENTER, CANVAS_YCENTER, DEFAULTCOLOUR);
                gameObjects.push(ball);
                break;
            case "volleyBall":
                net = new Net;
                net.init(CANVAS_XCENTER - net.WIDTH / 2, DEFAULTCOLOUR);
                gameObjects.push(net);
            case "keepyUps":
                ball = new Ball();
                ball.init(CANVAS_XCENTER, CANVAS_YCENTER, DEFAULTCOLOUR);
                gameObjects.push(ball);
                break;
            case "dodgeBall":
                let ballXDisplacement = 200;
                ball = new Ball();
                ball.init((CANVAS_XCENTER - ballXDisplacement), CANVAS_YCENTER, TEAM1COLOUR);
                gameObjects.push(ball);
                ball = new Ball();
                ball.init((CANVAS_XCENTER + ballXDisplacement), CANVAS_YCENTER, TEAM2COLOUR);
                gameObjects.push(ball);
                break;
        }
    }
    static ballHitObject(ball, object) {
        switch (gameMode) {
            case "keepyUps":
                score.score++;
                score.update();
                break;
            case "footBall":
                if (!(object.isPlayer)) {
                    ball.reset(CANVAS_XCENTER, CANVAS_YCENTER);
                    if (object.colour === TEAM2COLOUR){
                        score.T1Score++;
                        score.checkForWin();
                    }
                    else {
                        score.T2Score++;
                        score.checkForWin();
                    }
                }
                break;
            case "dodgeBall":
                if (!(ball.colour === object.colour)) {
                    ball.reset(CANVAS_XCENTER, CANVAS_YCENTER);
                    if (ball.colour === TEAM1COLOUR) {
                        score.T1Score++;
                        score.checkForWin()
                    }
                    else {
                        score.T2Score++;
                        score.checkForWin()
                    }
                }
                break;
        }
    }

    static ballHitFloor(ball) {
        switch (gameMode) {
            case "keepyUps":
                score.score = 0;
                break;
            case "volleyBall":
                if (ball.xPos > CANVAS_XCENTER) {
                    score.T1Score++;
                    ball.reset((CANVAS_XCENTER + CANVAS_WIDTH/4), CANVAS_YCENTER);
                }
                else {
                    score.T2Score++;
                    ball.reset((CANVAS_XCENTER - CANVAS_WIDTH/4), CANVAS_YCENTER);
                }
                score.checkForWin();
                break;
        }
    }
    static draw() {
        switch (gameMode) {
            case "startScreen":
                TextToScreen.drawControls(playerCount);
            break;
            case "keepyUps":
                displayText("Score: " + score.score.toFixed(0), score.scoreXPos, score.scoreYPos, DEFAULTCOLOUR);
                displayText("HighScore: " + score.highScore.toFixed(0), score.highScoreXPos, score.highScoreYPos, DEFAULTCOLOUR);
            break;
            case "gameOver":
                TextToScreen.drawGameOver();
            case "footBall":
            case "volleyBall":
            case "dodgeBall":
                displayText("SCORE: " + score.T1Score.toFixed(0), score.team1ScoreXPos, score.scoreYPos, TEAM1COLOUR);
                displayText("SCORE: " + score.T2Score.toFixed(0), score.team2ScoreXPos, score.scoreYPos, TEAM2COLOUR);
            break;
                }
        }
}