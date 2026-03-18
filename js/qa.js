const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function helloQA() {
    console.log("Integration & QA ready ✅");
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Здесь будут вызовы
    
    requestAnimationFrame(gameLoop);
}

helloQA()

gameLoop();

function gameLoop() {
    // ... предыдущий код ...
    
    // Войска
    drawTroop(ctx, 200, 300, 'knight', true);
    drawTroop(ctx, 300, 350, 'archer', true);
    drawTroop(ctx, 500, 300, 'knight', false);
    drawTroop(ctx, 600, 350, 'mage', false);
    
    // Интерфейс
    drawElixirBar(ctx, 6, 10);
    drawTowerScore(ctx, 2, 1);
    
    requestAnimationFrame(gameLoop);
}
