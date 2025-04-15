export class Flower extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // ...
        this.add.existing(this);
    }
}