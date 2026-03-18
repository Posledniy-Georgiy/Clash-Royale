window.drawArena = function(ctx) {
    ctx.fillStyle = '#228b22';
    ctx.fillRect(0, 0, 800, 600);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400, 300, 50, 0, Math.PI * 2);
    ctx.stroke();
}
