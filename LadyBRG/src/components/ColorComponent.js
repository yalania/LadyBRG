export default class ColorComponent {

    color;
    hueValue;

    constructor(scene, hue) {
        this.hueValue = hue;
        this.scene = scene;
        this.color = Phaser.Display.Color.HSVToRGB(this.hueValue / 360, scene.game.config.saturation, scene.game.config.lightness);

    }

    add(otherColorComponent) {

        if (this.hueValue <= 0) {
            this.hueValue = otherColorComponent.hueValue;
            this.color = otherColorComponent.color;
        } else if (otherColorComponent.hueValue <= 0) {
            otherColorComponent.hueValue = this.color;
            otherColorComponent.color = this.color;
        } else {

            this.hueValue = ((this.hueValue + otherColorComponent.hueValue)/2) % 360;

            const sat = 0.8;
            const light = 0.5;

            this.color = Phaser.Display.Color.HSVToRGB(this.hueValue / 360, sat, light);
        }
    }

    compare(otherColorComponent) {
        let hueDiff = Math.abs(this.hueValue - otherColorComponent.hueValue);
        return hueDiff <= 30;
    }

    getTint() {

        if (this.hueValue <= 0) {
            return Phaser.Display.Color.GetColor(255, 255, 255);
        } else {

            return Phaser.Display.Color.GetColor(this.color.r, this.color.g, this.color.b);
        }
    }

}