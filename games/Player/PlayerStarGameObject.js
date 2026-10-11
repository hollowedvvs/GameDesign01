class PlayerStarGameObject extends GameObject {
    currentPower = "pea"

    //colors for each power
    powerColors = {
        none: "white",
        pea: "green",
        fire: "red",
        knockback: "blue"
    }

    constructor() {
        //star is its own player child object
        super("PlayerStar", ["PlayerChild", "PlayerPower"], "default")

        //same star code that used to be inside PlayerGameObject
        this.addComponent(new PixelShape(), {
            fillStyle: this.powerColors[this.currentPower],
            pixelSize: 2,
            scale: 10,

            points: [
                new Vector2(0, -4), new Vector2(-1, -3), new Vector2(0, -3), new Vector2(1, -3),
                new Vector2(-2, -2), new Vector2(-1, -2), new Vector2(0, -2), new Vector2(1, -2), new Vector2(2, -2),
                new Vector2(-1, -1), new Vector2(0, -1), new Vector2(1, -1), new Vector2(0, 0)
            ]
        })
    }

    setPower(power) {
        //saves which power the star is showing
        this.currentPower = power

        let pixelShape = this.getComponent(PixelShape)

        if (!pixelShape) {
            return
        }

        //uses white if power does not have a color yet
        pixelShape.fillStyle = this.powerColors[power] ?? this.powerColors.none
    }
}
