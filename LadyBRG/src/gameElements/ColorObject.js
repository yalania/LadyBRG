import ColorComponent from "../components/ColorComponent.js";

export default class ColorObject {
    constructor(scene, x, y, hue) {
        this.colorComponent = new ColorComponent(scene,hue);
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.shape = scene.add.star(x, y, 6, 48, 96, this.colorComponent.getTint());
        this.shape.setInteractive();
    }

    addObject(otherColorObject) {
        this.colorComponent.add(otherColorObject.colorComponent);
        this.shape.destroy();
        this.shape = this.scene.add.star(this.x, this.y, 6, 48, 96, this.colorComponent.getTint());
    }

    compare(otherColorObject) {
        return this.colorComponent.compare(otherColorObject.colorComponent);
    }

    startMoveAnimation(otherColorObject) {
        this.scene.tweens.add({
            targets: this.shape,
            x: otherColorObject.x,
            y: otherColorObject.y,
            scale: 0.5,
            angle: 360,
            //alpha: 0.8,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                otherColorObject.addObject(this);
                this.shape.destroy();
            }
        });
    }
}