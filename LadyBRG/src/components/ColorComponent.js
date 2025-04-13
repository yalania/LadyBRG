export default class ColorComponent {

    color;
    additive;
    
    constructor(r = 0, g = 0, b = 0, additive = true) {
        this.color = new Phaser.Math.Vector3(r, g, b);
        if(additive)
        {
            this.additive = 1;
        }else{
            this.additive = -1;
        }
    }

    add(otherColorComponent) {
        this.color.addScale(otherColorComponent.color, additive);
        this.color = Phaser.Math.clamp(this.color, new Phaser.MatSh.Vector3(0, 0, 0),new Phaser.Math.Vector3(255, 255, 255));
        //this.color.clamp(new Phaser.Math.Vector3(0, 0, 0), new Phaser.Math.Vector3(255, 255, 255));
    }

    compare(otherColor)
    {
        return otherColor.color.equals(otherColorComponent.color);
    }

    getTint()
    {
        return Phaser.Display.Color.GetColor(this.color.x, this.color.y, this.color.z);
    }

}