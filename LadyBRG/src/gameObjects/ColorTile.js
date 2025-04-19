import ColorHelper from '../helpers/ColorHelper.js';

export default class ColorTile {
    constructor(scene, x, y, hue, direction) {
        this.x = x;
        this.y = y;
        this.hueValue = hue;
        this.size = scene.config.tilesSize;
        this.direction = direction;
        this.shape = this.drawRotationArrow(scene, x, y, ColorHelper.defaultHueToHex(scene, this.hueValue));
        this.shape.setInteractive({ useHandCursor: true });
    }

    drawRotationArrow(scene, x, y, color = 0xffffff) {
        const rotationSymbol = this.direction === 1 ? '↻' : '↺';
        const hexColor = Phaser.Display.Color.ValueToColor(color).color;
        const icon = scene.add.text(x , y, rotationSymbol, {
            font: `${this.size}px Arial`,
            fill: `#${hexColor.toString(16).padStart(6, '0')}`
        });

        return icon;
    }

    destroy() {
        this.shape.destroy();
    }
}