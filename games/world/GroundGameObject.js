class GroundGameObject extends GameObject {
    constructor(width = 100000, height = 60, surfaceFriction = 0.35) {
        //named layer and ground tag
        super("Ground", ["Ground"], "background")

        //ground visual
        this.addComponent(new Polygon(), {
            fillStyle: "lightgreen",
            points: [new Vector2(-width / 2, 0), new Vector2(width / 2, 0), new Vector2(width / 2, height), new Vector2(-width / 2, height)]
        })

        //keep custom ground values
        this.addComponent(new GameCollider(), {
            width: width, height: height, offsetY: height / 2, isStatic: true,
            surfaceFriction: surfaceFriction
        })
    }
}
