export default class ColorHelper {
    /**
     * Convierte un valor de hue (0-360) a un objeto RGB.
     * @param {number} hue - Valor de HUE en grados (0-360)
     * @param {number} saturation - Saturación (0-1)
     * @param {number} lightness - Luminosidad (0-1)
     * @returns {object} { r, g, b }
     */
    static hueToRGB(hue, saturation = 1, lightness = 1) {
        return Phaser.Display.Color.HSVToRGB(hue / 360, saturation, lightness);
    }

    /**
     * Convierte un hue a un valor hexadecimal.
     * @param {number} hue - Hue en grados (0-360)
     * @param {number} saturation - Saturación (0-1)
     * @param {number} lightness - Luminosidad (0-1)
     * @returns {number} Color en formato hexadecimal
     */
    static hueToHex(hue, saturation = 1, lightness = 1) {
        const rgb = this.hueToRGB(hue, saturation, lightness);
        return Phaser.Display.Color.GetColor(rgb.r, rgb.g, rgb.b);
    }

    /**
 * Convierte un hue a un valor hexadecimal usando valores de saturacion y luminosidad de la configuracion.
 * @param {Phase.scene} scene - escene del juego
 * @param {number} hue - Hue en grados (0-360)
 * @returns {number} Color en formato hexadecimal
 */
    static defaultHueToHex(scene, hue) {
        const rgb = this.hueToRGB(hue, scene.config.saturation, scene.config.lightness);
        return Phaser.Display.Color.GetColor(rgb.r, rgb.g, rgb.b);
    }

    static addColors(hueValue1, hueValue2) {
        let delta = ((hueValue2 - hueValue1 + 360) % 360);
        return (hueValue1 + delta / 2) % 360;
    }
    
    static subtractColors(hueValue1, hueValue2) {
        let delta = ((hueValue1 - hueValue2 + 360) % 360);
        return (hueValue1 - delta / 2 + 360) % 360;
    }

    static getColorToTarget(currentHue, targetHue) {
        const clockwiseDelta = (targetHue - currentHue + 360) % 360;
        const useAdd = clockwiseDelta <= 180;
  
        const hue = (2 * targetHue - currentHue + 360) % 360;
        const direction = useAdd ? 1 : -1;
        return { hue, direction };
    }

    static compareHUEValues(hueValue1, hueValue2, validRange) {
        let hueDiff = Math.abs(hueValue1 - hueValue2);
        return {
            diff: hueDiff,
            isWithinRange: hueDiff <= validRange
        };
    }
}