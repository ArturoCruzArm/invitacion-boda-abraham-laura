// ===================================
// TALAVERA POBLANA AUTÉNTICA
// Patrones tradicionales de cerámica mexicana
// ===================================

class TalaveraGenerative {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        // Paleta auténtica Talavera Poblana
        this.colors = {
            azulCobalto: '#1E3A8A',
            azulMedio: '#2563EB',
            azulClaro: '#3B82F6',
            blanco: '#FFFFFF',
            negro: '#1F2937'
        };

        // Tiles de tamaño estándar de azulejo
        this.tiles = [];
        this.tileSize = 200; // Tamaño de azulejo tradicional
        this.borderWidth = 4; // Bordes gruesos característicos

        this.init();
    }

    init() {
        this.generateTiles();
        this.drawStatic();
    }

    generateTiles() {
        const cols = Math.ceil(this.width / this.tileSize) + 2;
        const rows = Math.ceil(this.height / this.tileSize) + 2;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.tiles.push({
                    x: x * this.tileSize - this.tileSize,
                    y: y * this.tileSize - this.tileSize,
                    pattern: Math.floor(Math.random() * 4) // 4 patrones diferentes
                });
            }
        }
    }

    // PATRÓN 1: Cuatrifolio Tradicional (el más icónico)
    drawQuatrefoil(x, y, size) {
        const ctx = this.ctx;
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const petalRadius = size * 0.18;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Fondo blanco del tile
        ctx.fillStyle = this.colors.blanco;
        ctx.fillRect(-size/2, -size/2, size, size);

        // Borde del azulejo
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(-size/2, -size/2, size, size);

        // Cuatrifolio central (4 pétalos)
        ctx.globalAlpha = 1.0;
        const positions = [
            {x: 0, y: -petalRadius},
            {x: petalRadius, y: 0},
            {x: 0, y: petalRadius},
            {x: -petalRadius, y: 0}
        ];

        positions.forEach(pos => {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, petalRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.colors.azulCobalto;
            ctx.fill();
            ctx.strokeStyle = this.colors.negro;
            ctx.lineWidth = 3;
            ctx.stroke();
        });

        // Círculo central
        ctx.beginPath();
        ctx.arc(0, 0, petalRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.azulMedio;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Decoraciones en las esquinas
        const corners = [
            {x: size * 0.35, y: -size * 0.35},
            {x: size * 0.35, y: size * 0.35},
            {x: -size * 0.35, y: size * 0.35},
            {x: -size * 0.35, y: -size * 0.35}
        ];

        corners.forEach(corner => {
            ctx.beginPath();
            ctx.arc(corner.x, corner.y, size * 0.05, 0, Math.PI * 2);
            ctx.fillStyle = this.colors.azulClaro;
            ctx.fill();
            ctx.strokeStyle = this.colors.negro;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        ctx.restore();
    }

    // PATRÓN 2: Estrella de 8 puntas
    drawStarPattern(x, y, size) {
        const ctx = this.ctx;
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const outerRadius = size * 0.35;
        const innerRadius = size * 0.15;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Fondo blanco
        ctx.fillStyle = this.colors.blanco;
        ctx.fillRect(-size/2, -size/2, size, size);

        // Borde del azulejo
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(-size/2, -size/2, size, size);

        // Estrella de 8 puntas
        ctx.beginPath();
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const pointX = Math.cos(angle) * radius;
            const pointY = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        ctx.closePath();
        ctx.fillStyle = this.colors.azulCobalto;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Círculo central
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.blanco;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }

    // PATRÓN 3: Flor Talavera con pétalos definidos
    drawFlowerPattern(x, y, size) {
        const ctx = this.ctx;
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const petalLength = size * 0.3;
        const petalWidth = size * 0.12;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Fondo blanco
        ctx.fillStyle = this.colors.blanco;
        ctx.fillRect(-size/2, -size/2, size, size);

        // Borde del azulejo
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(-size/2, -size/2, size, size);

        // 8 pétalos bien definidos
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;

            ctx.save();
            ctx.rotate(angle);

            // Pétalo con forma elíptica
            ctx.beginPath();
            ctx.ellipse(0, -petalLength/2, petalWidth, petalLength/2, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.colors.azulMedio;
            ctx.fill();
            ctx.strokeStyle = this.colors.negro;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.restore();
        }

        // Centro decorativo
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.azulCobalto;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Círculo interior
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.blanco;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    // PATRÓN 4: Cruz geométrica Talavera
    drawCrossPattern(x, y, size) {
        const ctx = this.ctx;
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const armWidth = size * 0.2;
        const armLength = size * 0.4;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Fondo blanco
        ctx.fillStyle = this.colors.blanco;
        ctx.fillRect(-size/2, -size/2, size, size);

        // Borde del azulejo
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(-size/2, -size/2, size, size);

        // Cruz central
        ctx.fillStyle = this.colors.azulCobalto;

        // Brazo vertical
        ctx.fillRect(-armWidth/2, -armLength, armWidth, armLength * 2);
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.strokeRect(-armWidth/2, -armLength, armWidth, armLength * 2);

        // Brazo horizontal
        ctx.fillRect(-armLength, -armWidth/2, armLength * 2, armWidth);
        ctx.strokeRect(-armLength, -armWidth/2, armLength * 2, armWidth);

        // Centro de la cruz
        ctx.beginPath();
        ctx.arc(0, 0, armWidth * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.azulMedio;
        ctx.fill();
        ctx.strokeStyle = this.colors.negro;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Decoraciones en puntas de la cruz
        const points = [
            {x: 0, y: -armLength},
            {x: armLength, y: 0},
            {x: 0, y: armLength},
            {x: -armLength, y: 0}
        ];

        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, size * 0.04, 0, Math.PI * 2);
            ctx.fillStyle = this.colors.blanco;
            ctx.fill();
            ctx.strokeStyle = this.colors.negro;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        ctx.restore();
    }

    drawStatic() {
        // Fondo blanco base
        this.ctx.fillStyle = this.colors.blanco;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Dibujar todos los azulejos
        this.tiles.forEach(tile => {
            switch(tile.pattern) {
                case 0:
                    this.drawQuatrefoil(tile.x, tile.y, this.tileSize);
                    break;
                case 1:
                    this.drawStarPattern(tile.x, tile.y, this.tileSize);
                    break;
                case 2:
                    this.drawFlowerPattern(tile.x, tile.y, this.tileSize);
                    break;
                case 3:
                    this.drawCrossPattern(tile.x, tile.y, this.tileSize);
                    break;
            }
        });

        console.log('%c✨ Talavera Poblana Auténtica ✨', 'color: #1E3A8A; font-weight: bold; font-size: 14px;');
    }
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('talavera-canvas');
    if (!canvas) return;

    function initCanvas() {
        // Importante: dimensiones deben coincidir EXACTAMENTE con el CSS
        // para evitar distorsión (100vw x 100vh en CSS = innerWidth x innerHeight)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        new TalaveraGenerative(canvas);
    }

    initCanvas();

    // Solo reiniciar en resize significativo
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCanvas, 500);
    });
});
