import ColorTile from "../gameObjects/ColorTile.js";
import HUEWheel from '../gameObjects/HUEWheel.js';
import ColorHelper from '../helpers/ColorHelper.js';

export class Main extends Phaser.Scene {
    gametiles = [];
    currentTryNumber = 0;
    currentValidRange = 0;
    score = 0;
    tilesNumber = 0;
    needReset = false;
    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('MainBackground', 'assets/background/MainBackground.png');
        this.load.spritesheet('LadyBug', 'assets/character/ladybug.png', { frameWidth: 32, frameHeight: 32 });
        this.load.json('gameConfig', 'assets/data/MainScene.json');
        this.load.font('CuteFont', 'assets/fonts/CuteDino.ttf');
    }

    create() {
        this.config = this.cache.json.get('gameConfig');
        this.background = this.add.image(0, 0, 'MainBackground')
            .setOrigin(0)
            .setScale(0.65);
        const overlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.2);
        overlay.setOrigin(0);

        this.currentValidRange = this.config.validErrorRange;

        this.centerX = this.scale.width / 2;
        this.centerY = this.scale.height / 2;

        //Score
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '32px',
            color: '#ffff00',
            fontFamily: 'CuteFont',
        }).setDepth(5);

        this.remainingAttemptsText = this.add.text(20, 60, `Remaining Attempts: 0`, {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'CuteFont',
        }).setDepth(5);

        this.generateGame();
    }

    update() {
        if (this.needReset) {
            this.needReset = false;
            this.resetGame();
        }
    }

    onSelectedTile(tile) {
        this.hueWheel.updateladyBugMarker(tile.hueValue, tile.direction, () => {
            const result = this.hueWheel.areMarkerCloseEnough();
            const remainingAttempts = this.maxTryNumber - this.currentTryNumber;
            if (result.isWithinRange) {
                this.score += result.diff;
                this.scoreText.setText(`Score: ${this.score}`);
                const newValidRange = this.currentValidRange - 5
                this.currentValidRange = Phaser.Math.Clamp(newValidRange, 1, newValidRange);
                this.needReset = true;

            } else if (remainingAttempts <= 0) {
                this.scene.start('GameOver', { score: this.score }); // cambiar de escena con puntaje
            } else {
                this.generateValidCombinations();
                this.currentTryNumber++;
                this.remainingAttemptsText.setText(`Remaining Attempts: ${remainingAttempts}`);
            }
        });
    }

    generateGame() {
        const endYPostion = (this.centerY * this.config.marginY);
        this.createHueWheel(this.centerX, endYPostion);
        this.generateValidCombinations();
        this.maxTryNumber = Phaser.Math.Between(this.config.minNumberOfTries, this.config.maxNumberOfTries);
        this.remainingAttemptsText.setText(`Remaining Attempts: ${this.maxTryNumber}`);
    }

    createHueWheel(x, y) {
        let hue = Phaser.Math.Between(0, 360);
        this.hueWheel = new HUEWheel(this, x, y, 100, 40, hue, this.currentValidRange);
    }

    generateValidCombinations() {
        this.destroyTiles();
        const tilesNumber = this.config.tilesNumber;
        const tileSize = this.config.tilesSize;

        const maxTilesNumberPerRow = this.scale.width/ (tileSize + tileSize*2);
        const totalTileWidth = Math.min(maxTilesNumberPerRow,tilesNumber)* tileSize;
        const startXPosition =  this.centerX - totalTileWidth;
       
        let xPos = startXPosition;
        let yPos = this.centerY + (this.centerY * this.config.marginY)/2;

        let bestColorPosition = Phaser.Math.Between(0, tilesNumber - 1);
        for (let i = 0; i <tilesNumber; i++) {
            let hue = 0;
            let direction = 1;
            if (i === bestColorPosition) {
                const result = this.hueWheel.getPerfectColorToTarget();
                hue = result.hue;
                direction = result.direction;
            } else {
                hue = Phaser.Math.Between(0, 360);
                const randomValue = Phaser.Math.Between(0,1);
                direction = randomValue == 0? -1 : randomValue;
            }

            this.gametiles[i] = new ColorTile(this, xPos, yPos, hue, direction);

            const nextXPos = xPos + tileSize * 2;
            if (nextXPos >= this.scale.width - tileSize*2) {
                const leftTileNumber = tilesNumber - i -1;
                const totalTileWidth = Math.min(maxTilesNumberPerRow,leftTileNumber)* tileSize;
                xPos = this.centerX - totalTileWidth;
                yPos += this.gametiles[i].size * 2;
            } else {
                xPos = nextXPos;
            }

            this.gametiles[i].shape.on('pointerdown', () => {
                this.onSelectedTile(this.gametiles[i]);
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

    destroyTiles() {
        for (let i = 0; i < this.gametiles.length; i++) {
            this.gametiles[i].destroy();
        }
    }
}