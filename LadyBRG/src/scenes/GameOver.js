export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.text(centerX, centerY - 40, 'Game Over!', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, `Puntaje: ${this.score}`, {
            fontSize: '32px',
            color: '#ffff00'
        }).setOrigin(0.5);

        const restartText = this.add.text(centerX, centerY + 80, 'Restart', {
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#ff0000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        restartText.on('pointerdown', () => {
            this.scene.start('Main');
        });
    }
}