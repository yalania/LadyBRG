import ColorComponent from "../components/ColorComponent.js";

export default class ColorObject {
    constructor(scene, x, y, textura, r, g, b, additive) {
        this.colorComponent = new ColorComponent(r, g, b, additive);
        this.sprite = scene.add.sprite(x, y, textura);
        this.sprite.setInteractive();
        
        this.sprite.setTint(this.colorComponent.getTint());
    }

    addObject(otherColorObject) {
        this.colorComponent.add(otherColorObject.colorComponent);
        this.sprite.setTint(this.colorComponent.getTint());
    }

    compare(otherColorObject) {
        return colorComponent.compare(otherColorObject.colorComponent);
    }
}