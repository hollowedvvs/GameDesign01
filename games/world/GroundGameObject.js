class GroundGameObject extends GameObject {
    constructor(width = 100000, height = 60, surfaceFriction = 0.35) {
        //old object setup
        //super()

        //named layer and ground tag
        super("Ground", ["Ground"], "background")

        //old number layer
        //this.layer = -2

        //ground visual
        this.addComponent(new Polygon(), {
            fillStyle: "lightgreen",
            points: [new Vector2(-width / 2, 0), new Vector2(width / 2, 0), new Vector2(width / 2, height), new Vector2(-width / 2, height)]
        })

        //where there is ground there is collision
        this.addComponent(new Collider(), {
            width: width, height: height, offsetY: height / 2, isStatic: true,
            surfaceFriction: surfaceFriction
        })
    }
}