import { LadyBug } from '../gameObjects/LadyBug.js';

export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background/Summer6.png');
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.background = this.add.image(1152, 648, 'background');

        this.ladyBug = new LadyBug(this, -100, 550, 'LadyBug', 270);
        this.ladyBug.setScale(4);

        this.startLadyBugTween();
        this.animationChangeTimer = 0;
        this.delay = 0;

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.text(centerX, centerY - 100, 'Lady BRG', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Click or Press SPACEBAR to start', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Input
        this.input.once('pointerdown', () => {
            this.scene.start('Main');
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Main');
        });
    }

    update() {
        this.animationChangeTimer += this.sys.game.loop.delta;
        if(this.ladyBugTween.isPlaying && this.animationChangeTimer > this.delay)
        {
            const anim = Phaser.Math.Between(0, 1) === 0 ? 'jump' : 'move';
            this.ladyBug.anims.play(anim, true);
            this.animationChangeTimer = 0;
            this.delay = Phaser.Math.Between(500, 1000);
        }
    }

    startLadyBugTween() {
        this.ladyBug.setPosition(-100, 550);
        this.ladyBugTween = this.tweens.add({
            targets: this.ladyBug,
            x: this.scale.width + 100,
            duration: 4000,
            ease: 'Linear',
            onComplete: () => {
                const delay = Phaser.Math.Between(1000, 3000);
                this.time.delayedCall(delay, () => {this.startLadyBugTween();} ); // Lo vuelve a lanzar
            }
        });
    }
    
}