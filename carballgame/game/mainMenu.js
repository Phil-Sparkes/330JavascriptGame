class Menu {
    drawMainMenu() {
        colorRect(CANVAS_WIDTH/4, CANVAS_HEIGHT/2 + CANVAS_HEIGHT/6, CANVAS_WIDTH/2, CANVAS_HEIGHT/7, "black");
        colorRect(CANVAS_WIDTH/4, CANVAS_HEIGHT/2,                   CANVAS_WIDTH/2, CANVAS_HEIGHT/7, "black");
        colorRect(CANVAS_WIDTH/4, CANVAS_HEIGHT/2 - CANVAS_HEIGHT/6, CANVAS_WIDTH/2, CANVAS_HEIGHT/7, "black");

        displayText("Main Menu"     , CANVAS_WIDTH/2, CANVAS_HEIGHT/5,    "red");
        displayText("[1] VolleyBall", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.4,  "red");
        displayText("[2] Keepy Ups" , CANVAS_WIDTH/2, CANVAS_HEIGHT/1.72, "red");
        displayText("[3] DodgeBall" , CANVAS_WIDTH/2, CANVAS_HEIGHT/1.32, "red");
    }
    drawGameOver() {
        displayText("Game Over"             , CANVAS_WIDTH/2, CANVAS_HEIGHT/5, "red");
        displayText("'Esc' key to return to menu" , CANVAS_WIDTH/2, CANVAS_HEIGHT/4, "red");
    }
}
