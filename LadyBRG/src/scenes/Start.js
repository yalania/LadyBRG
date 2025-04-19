import {LadyBug} from '../gameObjects/LadyBug.js';
import {Main} from '../scenes/Main.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background/Summer6.png');
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.background = this.add.image(1152, 648, 'background');
        //this.background.setScale(0.5); 
        this.ladyBug = new LadyBug(this, 100, 450, 'LadyBug', 270);
        this.ladyBug.setScale(3);

        this.add.text(0, 0, 'Click to add new Scene');

        this.input.once('pointerdown', function () {

            this.scene.start('Main');

        }, this);
    }

    update() {
        //this.background.tilePositionX += 32;
        this.ladyBug.anims.play('idle', true);

    }
}
