export default class ColorComponent {

    color;
    additiveValue;
    
    constructor(r = 0, g = 0, b = 0, isAdditive = true) {
        this.color = new Phaser.Math.Vector3(r, g, b);
        if(isAdditive)
        {
            this.additiveValue = 1;
        }else{
            this.additiveValue = -1;
        }
    }

    add(otherColorComponent) {
        this.color.addScale(otherColorComponent.color, otherColorComponent.additiveValue);
        this.color.x = Phaser.Math.Clamp(this.color.x, 0, 255);
        this.color.y = Phaser.Math.Clamp(this.color.y, 0, 255);
        this.color.z = Phaser.Math.Clamp(this.color.z, 0, 255);
        //this.color.clamp(new Phaser.Math.Vector3(0, 0, 0), new Phaser.Math.Vector3(255, 255, 255));
    }

    compare(otherColorComponent)
    {
        return this.color.equals(otherColorComponent.color);
    }

    getTint()
    {
        return Phaser.Display.Color.GetColor(this.color.x, this.color.y, this.color.z);
    }

}