import ColorComponent from "../components/ColorComponent.js";
import ColorObject from "../gameElements/ColorObject.js";
import {LadyBug} from '../gameObjects/LadyBug.js';

export class Start extends Phaser.Scene {

    resultColor = new ColorComponent(0,0,0,true);
    targetColor = null;
    constructor() {
        super('Start');
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
    }

    update() {
        //this.background.tilePositionX += 32;
        this.ladyBug.anims.play('move', true);
    }

    generateGame(tilesNumber)
    {
        const rValue = Phaser.Math.Between(0, 255);
        const gValue = Phaser.Math.Between(0, 255);
        const bValue = Phaser.Math.Between(0, 255);

        let rPercentage = 100;
        let gPercentage = 100;
        let bPercentage = 100;

        let tiles = [];
        let xPos = 400;
        let yPos = 200;
        for(let i = 0; i < tilesNumber; i++)
        {
            const rPercentageRandom = Phaser.Math.Between(0, rPercentage);
            const gPercentageRandom = Phaser.Math.Between(0, gPercentage);
            const bPercentageRandom = Phaser.Math.Between(0, bPercentage);

            const rTileValue = rPercentageRandom * rValue;
            const gTileValue = gPercentageRandom * gValue;
            const bTileValue = bPercentageRandom * bValue;
            tiles[i] = new ColorObject(this, xPos, yPos, 'ship',rTileValue,gTileValue,bTileValue, true);
            tiles[i].sprite.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
                frameRate: 15,
                repeat: -1
            });
            tiles[i].sprite.play('fly');
            tiles[i].sprite.on('pointerdown', () => {

                this.resultColor.add(tiles[i].colorComponent);
                if(this.resultColor.compare(this.targetColor.colorComponent))
                {
                    this.generateGame(3);
                }

            });

            rPercentage -= rPercentageRandom;
            gPercentage -= gPercentageRandom;
            bPercentage -= bPercentageRandom;
            xPos+= 250;
        }

       this.targetColor = new ColorObject(this, 640, 360, 'ship',rValue,gValue,bValue, true);
    }
    
}
