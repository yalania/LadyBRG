import ColorHelper from '../helpers/ColorHelper.js';
export default class ColorTile {
    constructor(scene, x, y, hue, direction) {
        this.x = x;
        this.y = y;
        this.hueValue = hue;
        this.width = scene.config.tilesSize;
        this.height = scene.config.tilesSize;
        this.direction = direction;
        this.arrowSize = 20;

        const data = direction == 1 ? this.getRightArrowData() : this.getLeftArrowData();
        this.shape = scene.add.polygon(x, y, data, ColorHelper.defaultHueToHex(scene, hue));

        this.shape.setOrigin(0.5);
        this.shape.setInteractive();
    }

    getRightArrowData() {
        const shaftHeight = this.height;
        const shaftLength = this.width;
        const arrowSize = this.arrowSize;
        const rightArrowData = [
            // Línea vertical izquierda
            0, 0,
            0, shaftHeight,

            // Línea horizontal hasta la derecha
            shaftLength, shaftHeight,

            // Punta de flecha
            shaftLength, shaftHeight + arrowSize,
            shaftLength + arrowSize, shaftHeight / 2,
            shaftLength, -arrowSize,

            // Línea de vuelta hacia inicio
            shaftLength, 0,
            0, 0
        ];

        return rightArrowData;
    }


    getLeftArrowData() {
        const shaftHeight = this.height;
        const shaftLength = this.width;
        const arrowSize = this.arrowSize;
        const leftArrowData = [
            // Línea vertical derecha
            shaftLength, 0,
            shaftLength, shaftHeight,

            // Línea horizontal hasta la derecha
            0, shaftHeight,

            // Punta de flecha
            0, shaftHeight + arrowSize,
            -arrowSize, shaftHeight / 2,
            0, -arrowSize,

            // Línea de vuelta hacia inicio
            0, 0,
            shaftLength, 0
        ];

        return leftArrowData;
    }
    
    destroy()
    {
        this.shape.destroy();
    }
}