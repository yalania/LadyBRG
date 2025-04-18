import ColorTile from "../gameObjects/ColorTile.js";
import {LadyBug} from '../gameObjects/LadyBug.js';
import HUEWheel from '../gameObjects/HUEWheel.js';

export class Main extends Phaser.Scene {
    gametiles = [];
    currentTryNumber = 0;
    maxTryNumber = 0;
    currentValidRange = 30;
    score = 0;
    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('background', 'assets/background/Summer5.png');
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.background = this.add.image(1152, 648, 'background');
        this.ladyBug = new LadyBug(this, 100, 450, 'LadyBug');
        this.ladyBug.setDepth(3);

        //Score
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            color: '#ffffff'
        }).setDepth(5);

        this.remainingAttemptsText = this.add.text(20, 45, `Remaining Attempts: 0`, {
        fontSize: '24px',
        color: '#ffffff'
        }).setDepth(5);

        this.generateGame(8);    
    }

    update() {
        this.ladyBug.anims.play('idle', true);      
    }

    onSelectedTile(tile) {
        this.hueWheel.updateCurrentMarker(tile.hueValue);
        const result = this.hueWheel.areMarkerCloseEnough();
        if (result.isWithinRange) {
            this.score += result.diff;
            this.scoreText.setText(`Puntos: ${this.score}`);
            this.resetGame();

        } else if (this.currentTryNumber > this.maxTryNumber) {
            this.scene.start('GameOver', { score: this.score }); // cambiar de escena con puntaje
        } else {
            //this.generateValidCombinations(8);
            this.currentTryNumber++;
            const remainingAttempts = this.maxTryNumber - this.currentTryNumber;
            this.remainingAttemptsText.setText(`Remaining Attempts: ${remainingAttempts}`);
        }
    }

    generateGame(tilesNumber) {

        const marginY = 0.4;
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const endYPostion = (centerY * marginY);
        this.createHueWheel(centerX, endYPostion);
        this.generateValidCombinations(tilesNumber);
        this.maxTryNumber = Phaser.Math.Between(5, 12);
        this.remainingAttemptsText.setText(`Remaining Attempts: ${this.maxTryNumber}`);
    }

    createHueWheel(x, y) {
        let hue = Phaser.Math.Between(0, 360);
        this.hueWheel = new HUEWheel(this,x,y,100, 40, hue, this.currentValidRange);
    }

    generateValidCombinations(tilesNumber) {
        this.gametiles.length = 0;

        const marginX = 0.4;
        const marginY = 0.4;

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const endYPostion =  (centerY* marginY); 
        const endXPostion = this.scale.width - (centerX* marginX); 
        const startXPosition = (centerX - (centerX* marginX)) - 40;
        let xPos = startXPosition;
        let yPos = endYPostion + (centerY* marginY) + 40;

        for (let i = 0; i < tilesNumber; i++) {
            //Use basic colors that are easy to mix
            let hue = Phaser.Math.Between(0, 360);
            this.gametiles[i] = new ColorTile(this, xPos, yPos, hue);

            const nextXPos = xPos + ( this.gametiles[i].width*2);
            if(nextXPos >= endXPostion)
            {
                xPos = startXPosition -  this.gametiles[i].width;
                yPos +=  this.gametiles[i].height*2;
            }else{
                xPos = nextXPos;
            }

            this.gametiles[i].shape.on('pointerdown', () => {
                this.onSelectedTile( this.gametiles[i]);
            });
            this.gametiles[i].shape.setDepth(2);
        }
        
    }

    resetGame() {

        // Reiniciar intentos
        this.currentTryNumber = 0;
        this.hueWheel.destroy();
        this.generateGame(8);
    }
}