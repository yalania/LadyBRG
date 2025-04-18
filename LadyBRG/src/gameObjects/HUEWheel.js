import ColorHelper from '../helpers/ColorHelper.js';

export default class HUEWheel {
    constructor(scene, x, y, radius, width, hue, validRange) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.radius = radius;
        this.targetHue = hue;
        this.currentHue = 0;
        this.offset = 270;
        this.validRange = validRange;


        this.hueCircle = this.scene.add.graphics();
        this.drawHueCircle();

        // Marcadores
        this.targetMarker = this.createTargetZoneMarker();
        this.currentMarker = this.createLinealMarker(0x000000);

        this.updateCurrentMarker(0);
    }

    createTargetZoneMarker() {
        const marker = this.scene.add.graphics();
        marker.beginPath();
        marker.lineStyle(this.width, ColorHelper.defaultHueToHex(this.scene, this.targetHue));

        const midAngle = (this.offset + this.targetHue) % 360;
        marker.arc(this.x, this.y, this.radius + this.width +2, Phaser.Math.DegToRad(midAngle - this.validRange), Phaser.Math.DegToRad(midAngle + this.validRange), false);
        marker.strokePath();
        marker.closePath();
        return marker;
    }

    createLinealMarker(color) {
        const marker = this.scene.add.line(0, 0, 0, 0, 0, -this.width/2, color)
            .setOrigin(0.5, 1)
            .setLineWidth(3)
            .setDepth(2);
        return marker;
    }

    createCircularMarker(color) {
        const marker = this.scene.add.circle(0, 0, this.width/2, color);
        marker.setDepth(1);
        return marker;
    }

    drawHueCircle() {
        const steps = 360;
        for (let i = 0; i < steps; i++) {
            this.hueCircle.beginPath();
            this.hueCircle.lineStyle(this.width, ColorHelper.defaultHueToHex(this.scene, i));
            const currentStartAngle = (this.offset + i) % 360;
            const currentEndAngle = (currentStartAngle + 1) % 360;
            this.hueCircle.arc(this.x, this.y, this.radius, Phaser.Math.DegToRad(currentStartAngle), Phaser.Math.DegToRad(currentEndAngle), false);
            this.hueCircle.strokePath();
            this.hueCircle.closePath();
        }
    }

    updateCurrentMarker(hue) {
        this.currentHue = ColorHelper.addColors(this.currentHue, hue);
        this.positionMarker(this.currentMarker, this.currentHue);
        this.currentMarker.setStrokeStyle(this.width/2, ColorHelper.hueToHex(this.currentHue));
    }

    positionMarker(marker, hue) {
        const angle = Phaser.Math.DegToRad(hue + this.offset); // -90 para que 0° apunte hacia arriba
        const x = this.x + this.radius * Math.cos(angle);
        const y = this.y + this.radius * Math.sin(angle);
        marker.setPosition(x, y);
        marker.setRotation(angle + Phaser.Math.DegToRad(this.offset)); // Ajustamos para que la barra apunte hacia afuera
    }

    areMarkerCloseEnough()
    {
        const result = ColorHelper.compareHUEValues(this.targetHue, this.currentHue, this.validRange);
        const scoreResult = 360 - result.diff;
        return {
            diff: scoreResult,
            isWithinRange: result.isWithinRange
        };
    }

    destroy()
    {
        this.hueCircle.destroy();
        this.targetMarker.destroy();
        this.currentMarker.destroy();
    }
}