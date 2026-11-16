class PointsGameObject extends GameObject {
    constructor() {
        super("PointsGameObject", ["Points"], "UI")

        this.addComponent(new TextLabel(), { text: "0 points" })
        this.addComponent(new PointsController())
    }

    draw(ctx) {
        let scale = (Engine.canvas.width - Engine.letterBoxingWidth) / Engine.cameraWidthInWorldSpace

        this.transform.position.x = Engine.letterBoxingWidth / 2 + 20 * scale
        this.transform.position.y = Engine.letterBoxingHeight / 2 + 30 * scale
        this.transform.scale = new Vector2(scale, scale)

        super.draw(ctx)
    }
}