import ColorComponent from "../components/ColorComponent.js";
import ColorObject from "../gameElements/ColorObject.js";
import {LadyBug} from '../gameObjects/LadyBug.js';

export class Main extends Phaser.Scene {

    resultColor = null;
    targetColor = null;
    selectionCount = 0;
    maxSelectionCount = 0;
    selectedTiles = [];
    constructor() {
        super('Main');
    }

    preload() {
                this.load.image('background', 'assets/background/Summer5.png');
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.background = this.add.image(1152, 648, 'background');
        this.generateGame(8);    
        this.ladyBug = new LadyBug(this, 100, 450, 'LadyBug');
        this.ladyBug.setDepth(3);
        this.selectionCount = 0;
        this.add.text(0, 0, 'Need:' + this.maxSelectionCount);
    }

    update() {
        //this.background.tilePositionX += 32;
        this.ladyBug.anims.play('idle', true);
        
    }

    onSelectedTile(tile)
    {
        tile.startMoveAnimation(this.resultColor, this.targetColor);
        this.time.delayedCall(1021, () => {
            this.selectionCount++;
            if (this.resultColor.compare(this.targetColor)) {
                this.ladyBug.anims.play('jump', true);
                this.time.delayedCall(2000, () => {
                    this.scene.restart();
                });
            }else if (this.selectionCount >= this.maxSelectionCount)
            {
                                this.time.delayedCall(2000, () => {
                this.scene.restart();
                                });
            }
        });
    }

    generateGame(tilesNumber) {
        const marginX = 0.4;
        const marginY = 0.4;

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const endXPostion = this.scale.width - (centerX* marginX); 
        const endYPostion = this.scale.height  - (centerY* marginY); 

        this.generateTargetColor(centerX, endYPostion);

        let xPos = (centerX - (centerX* marginX)) - 48;
        let yPos = centerY - (centerY* marginY);
        this.generateValidCombinations(tilesNumber, xPos, yPos, endXPostion);

        //GenerateTarget

        this.resultColor = new ColorObject(this, 148, endYPostion, 0);
        this.resultColor.shape.setDepth(1);
    }

    generateTargetColor(x, y) {
        let hue = Phaser.Math.Between(0, 360);
        this.targetColor = new ColorObject(this, x, y, hue);
    }

    generateValidCombinations(tilesNumber,x, y, endXPostion) {
        let tiles = [];
        let xPos = x;
        let yPos = y;

        this.maxSelectionCount = 2;
        for (let i = 0; i < tilesNumber; i++) {
            //Use basic colors that are easy to mix
            let hue = Phaser.Math.Between(0, 360);
            tiles[i] = new ColorObject(this, xPos, yPos, hue);

            const nextXPos = xPos + (96*2);
            if(nextXPos >= endXPostion)
            {
                xPos = x - 48;
                yPos += 96*2;
            }else{
                xPos = nextXPos;
            }

            tiles[i].shape.on('pointerdown', () => {
                this.onSelectedTile(tiles[i]);
            });
            tiles[i].shape.setDepth(2);
            //hue = (hue + colorStep);
        }
    }
}