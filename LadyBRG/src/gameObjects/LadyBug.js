export class LadyBug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, angle) {
        super(scene, x, y, texture);
        this.setDepth(2);
        this.setScale(2);
        this.setAngle(angle + 90);
        scene.add.existing(this);

        if (!scene.anims.exists('move')) {
            scene.anims.create({
                key: 'move',
                frames: this.anims.generateFrameNumbers('LadyBug', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });

            scene.anims.create({
                key: 'jump',
                frames: this.anims.generateFrameNumbers('LadyBug', { start: 7, end: 13 }),
                frameRate: 20,
                repeat: -1
            });

            scene.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('LadyBug', { start: 4, end: 5 }),
                frameRate: 5,
                repeat: -1
            });

            scene.anims.create({
                key: 'success',
                frames: this.anims.generateFrameNumbers('LadyBug', { start: 14, end: 20 }),
                frameRate: 5,
                repeat: -1
            });

            scene.anims.create({
                key: 'fail',
                frames: this.anims.generateFrameNumbers('LadyBug', { start: 27, end: 30 }),
                frameRate: 5,
                repeat: 0
            });
        }
    }
}