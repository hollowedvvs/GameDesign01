class LaserGameObject extends GameObject {
    constructor(direction) {
        super()

        // layer lines
        this.layer = -1

        this.addComponent(new LaserController(), {
            direction: direction
        })

        // old laser
        /*
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [
                new Vector2(-5, -15),
                new Vector2(5, -15),
                new Vector2(5, 15),
                new Vector2(-5, 15),
            ]
        })
        */

        //rotating laser
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            rotation: Math.atan2(direction.y, direction.x) + Math.PI / 2,
            points: [
                new Vector2(-5, -15),
                new Vector2(5, -15),
                new Vector2(5, 15),
                new Vector2(-5, 15),
            ]
        })
    }
}