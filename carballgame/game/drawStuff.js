
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function displayText(text, x, y, colour) {
    canvasContext.font="60px Arial";
    canvasContext.font = "30px Comic Sans MS";
    canvasContext.fillStyle = colour;
    canvasContext.textAlign = "center";
    canvasContext.fillText(text, x, y);
}