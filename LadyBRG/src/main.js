import { Start } from './scenes/Start.js';
import { Main } from './scenes/Main.js';
import { GameOver } from './scenes/GameOver.js';
import { TestScene } from './scenes/test/TestScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Lady BRG',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
          Main, GameOver
         //TestScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }  
}

new Phaser.Game(config);
            