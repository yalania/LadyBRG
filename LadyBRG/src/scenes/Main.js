import ColorComponent from "../components/ColorComponent.js";
import ColorObject from "../gameElements/ColorObject.js";
import {LadyBug} from '../gameObjects/LadyBug.js';

export class Main extends Phaser.Scene {

    resultColor = null;
    targetColor = null;
    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        //this.load.image('LadyBug', 'assets/character/ladybug.png');
    

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        //this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        this.generateGame(3);    
        this.ladyBug = new LadyBug(this, 100, 450, 'LadyBug');
        this.ladyBug.setDepth(3);
    }

    update() {
        //this.background.tilePositionX += 32;
        this.ladyBug.anims.play('idle', true);
        
    }

    onSelectedTile(tile)
    {
        tile.startMoveAnimation(this.resultColor, this.targetColor);
        this.time.delayedCall(1021, () => {
            if (this.resultColor.compare(this.targetColor)) {
                this.ladyBug.anims.play('jump', true);
                this.time.delayedCall(2000, () => {
                    this.scene.restart();
                });
            }
        });
    }

    generateGame(tilesNumber) {
        const rValue = Phaser.Math.Between(0, 255);
        const gValue = Phaser.Math.Between(0, 255);
        const bValue = Phaser.Math.Between(0, 255);

        let targetRValue = 0;
        let targetGValue = 0;
        let targetBValue = 0;

        let rPercentage = 100;
        let gPercentage = 100;
        let bPercentage = 100;

        let tiles = [];
        let xPos = 400;
        let yPos = 200;
        for (let i = 0; i < tilesNumber; i++) {
            const rPercentageRandom = Phaser.Math.Between(0, rPercentage);
            const gPercentageRandom = Phaser.Math.Between(0, gPercentage);
            const bPercentageRandom = Phaser.Math.Between(0, bPercentage);

            const rTileValue = (rPercentageRandom * rValue) / 100;
            const gTileValue = (gPercentageRandom * gValue) / 100;
            const bTileValue = (bPercentageRandom * bValue) / 100;
            tiles[i] = new ColorObject(this, xPos, yPos, rTileValue, gTileValue, bTileValue, true);

            rPercentage -= rPercentageRandom;
            gPercentage -= gPercentageRandom;
            bPercentage -= bPercentageRandom;
            xPos += 250;

            tiles[i].shape.on('pointerdown', () => {
                this.onSelectedTile(tiles[i]);
            });
            tiles[i].shape.setDepth(2);

            targetRValue += rTileValue;
            targetGValue += gTileValue;
            targetBValue += bTileValue;
        }

        yPos += 96 * 3;
        this.targetColor = new ColorObject(this, 648, yPos, targetRValue, targetGValue, targetBValue, true);
        this.resultColor = new ColorObject(this, 148, yPos, 0, 0, 0, true);
        this.resultColor.shape.setDepth(1);
    }
}