class GroundGameObject extends GameObject {
    constructor() {
        super()

        this.layer = -2

        this.addComponent(new Polygon(), {
            fillStyle: "gray",
            points: [
                new Vector2(-480, 0),
                new Vector2(480, 0),
                new Vector2(480, 60),
                new Vector2(-480, 60)
            ]
        })
    }
}