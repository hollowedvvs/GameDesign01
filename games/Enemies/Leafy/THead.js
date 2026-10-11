class THead extends GameObject {
    constructor() {
        super("THead", ["EnemyChild", "THead"], "default")

        //main leafy head
        this.addComponent(new Polygon(), {
            fillStyle: "green",

            points: [
                new Vector2(-15, -15), new Vector2(15, -15), new Vector2(15, 15), new Vector2(-15, 15)
            ]
        })

        //front of head
        //points right by default so rotation shows direction
        this.addComponent(new Polygon(), {
            fillStyle: "darkgreen",

            points: [
                new Vector2(15, -5), new Vector2(25, -5), new Vector2(25, 5), new Vector2(15, 5)
            ]
        })
    }
}
