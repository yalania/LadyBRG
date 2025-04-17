import { Start } from './scenes/Start.js';
import { Main } from './scenes/Main.js';

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
    }   
}

new Phaser.Game(config);
            