import { Start } from './scenes/Start.js';
import { Main } from './scenes/Main.js';
import { GameOver } from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Main
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    custom: {
    saturation: 0.8,
    lightness: 0.5,
    tilesSize: 20,
    tilesAmount: 20,
    minNumberOfTries: 5,
    maxNumberOfTries: 12
    }   
}

new Phaser.Game(config);
            