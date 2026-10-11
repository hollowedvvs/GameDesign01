class PointsGameObject extends GameObject {
    constructor() {

        //old points setup
        //super(
        //   "PointsGameObject",
        //   [],
        //   "UI"
        //)

        //points tag lets other systems find the score directly
        super("PointsGameObject", ["Points"], "UI")

        this.addComponent(new TextLabel(), {
            text: "0 points"
        })

        this.addComponent(new PointsController())
    }
}
