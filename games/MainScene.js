class MainScene extends Scene {
    constructor() {
        super()

        // player
        this.instantiate(
            new MainGameObject(),
            new Vector2(50, 50)
        )

        // ground
        this.instantiate(
            new GroundGameObject(),
            new Vector2(480, 480)
        )
    }
}