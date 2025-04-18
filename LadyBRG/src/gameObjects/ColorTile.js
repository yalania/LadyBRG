import ColorHelper from '../helpers/ColorHelper.js';
export default class ColorTile
{
    constructor(scene, x, y, hue) {
        this.x = x;
        this.y = y;
        this.hueValue = hue;
        this.width = 40;
        this.height = 40;

        this.shape = scene.add.rectangle(x, y, this.width, this.height, ColorHelper.defaultHueToHex(scene, hue));
        this.shape.setOrigin(0.5);
        this.shape.setInteractive();
    }
}