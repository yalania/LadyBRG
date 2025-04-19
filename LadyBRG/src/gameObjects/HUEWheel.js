import ColorHelper from '../helpers/ColorHelper.js';
import {LadyBug} from '../gameObjects/LadyBug.js';

export default class HUEWheel {
    constructor(scene, x, y, radius, width, hue, validRange) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.radius = radius;
        this.targetHue = hue;
        this.offset = 270;
        this.validRange = validRange;

        this.hueCircle = this.scene.add.graphics();
        this.drawHueCircle();

        // Marcadores
        this.targetMarker = this.createTargetZoneMarker();

        //Starting color and current marker
        const offset = 20 + validRange;
        const randomAngleOffset = Phaser.Math.Between(offset, 360 - offset);
        this.currentHue = (hue + randomAngleOffset) % 360;
        this.ladyBugMarker = this.createLadyBugMarker();
        this.ladyBugMarker.anims.play('idle', true);
    }

    createTargetZoneMarker() {
        const marker = this.scene.add.graphics();
        marker.beginPath();
        marker.lineStyle(this.width, ColorHelper.defaultHueToHex(this.scene, this.targetHue));

        const midAngle = (this.offset + this.targetHue) % 360;
        marker.arc(this.x, this.y, this.radius + this.width + 2, Phaser.Math.DegToRad(midAngle - this.validRange), Phaser.Math.DegToRad(midAngle + this.validRange), false);
        marker.strokePath();
        marker.closePath();
        return marker;
    }

    createLadyBugMarker() {
        const result = this.positionMarker(this.currentHue);
        return new LadyBug(this.scene, result.xPos, result.yPos, 'LadyBug', result.angle);
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

    positionMarker(hue) {
        const angle = Phaser.Math.DegToRad(hue + this.offset);
        const markerDistance = this.radius + this.width / 2 + 10;
        const x = this.x + markerDistance * Math.cos(angle);
        const y = this.y + markerDistance * Math.sin(angle);
        const angleDeg = Phaser.Math.RadToDeg(angle);
        return {
            xPos: x,
            yPos: y,
            angle: angleDeg
        };
    }

    updateladyBugMarker(hue, direction ,finishCallback) {
        const oldHue = this.currentHue;
        this.currentHue = direction == 1 ? ColorHelper.addColors(this.currentHue, hue) : ColorHelper.subtractColors(this.currentHue, hue);
        const markerDistance = this.radius + this.width / 2 + 10;

        const ellipse = new Phaser.Curves.Ellipse(this.x, this.y, markerDistance, markerDistance);
        const fromT = ((this.offset + oldHue) % 360) / 360;
        let toT = ((this.offset + this.currentHue) % 360) / 360;

        if (direction === 1 && toT < fromT) {
            toT += 1;
        } else if (direction === -1 && toT > fromT) {
            toT -= 1;
        }

        this.scene.tweens.addCounter({
            from: fromT,
            to: toT,
            duration: 500,
            ease: 'Sine.easeInOut',
            onUpdate: (tween) => {
                const t = tween.getValue();
                const point = ellipse.getPoint(t);
                this.ladyBugMarker.setPosition(point.x, point.y);

                const tangent = ellipse.getTangent(t);
                let angle = Phaser.Math.RadToDeg(Math.atan2(tangent.y, tangent.x));

                this.ladyBugMarker.setAngle(angle);
                this.ladyBugMarker.anims.play('jump', true);
            },
            onComplete: () => {
                finishCallback();
                this.ladyBugMarker.anims.play('idle', true);
            }
        });
    }

    areMarkerCloseEnough() {
        const result = ColorHelper.compareHUEValues(this.targetHue, this.currentHue, this.validRange);
        const scoreResult = 360 - result.diff;
        return {
            diff: scoreResult,
            isWithinRange: result.isWithinRange
        };
    }

    getPerfectColorToTarget()
    {
        return ColorHelper.getColorToTarget(this.currentHue, this.targetHue);
    }

    destroy() {
        this.hueCircle.destroy();
        this.targetMarker.destroy();
        this.ladyBugMarker.destroy();
    }
}