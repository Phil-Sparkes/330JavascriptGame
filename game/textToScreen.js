class TextToScreen {
    static drawControls(playerCount) {
        let textSpacing = 40;
        displayText("Controls:" , CANVAS_XCENTER, textSpacing*3, DEFAULTCOLOUR);
        displayText("Player1: WASD" , CANVAS_XCENTER, textSpacing*4, TEAM1COLOUR);
        if (playerCount >= 2) {
            displayText("Player2: Arrow keys" , CANVAS_XCENTER, textSpacing*5, TEAM2COLOUR);
        }
        if (playerCount >= 3) {
            displayText("Player3: IJKL" , CANVAS_XCENTER, textSpacing*6, TEAM1COLOUR);
        }
        if (playerCount >= 4) {
            displayText("Player4: Numpad 8456" , CANVAS_XCENTER, textSpacing*7, TEAM2COLOUR);
        }
        displayText("Pick game mode below" , CANVAS_XCENTER, CANVAS_HEIGHT - textSpacing*2, DEFAULTCOLOUR);
    }
    static drawGameOver() {
        let textSpacing = 40;
        displayText("Game Over" , CANVAS_XCENTER, textSpacing*2, DEFAULTCOLOUR);
    }
}
