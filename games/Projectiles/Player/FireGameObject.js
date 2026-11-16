class FireGameObject extends ProjectileGameObject {
    constructor(direction) {
        //projectile parent handles name, tags, layer, and rotation
        super("Fire", ["PlayerProjectile", "PlayerFire"], direction)

        //projectile parent handles passing direction
        this.addProjectileController(new PlayerFireController(), direction)

        //outer
        this.addComponent(new Polygon(), {
            fillStyle: "red",

            points: [
                new Vector2(-8, -10), new Vector2(6, -7), new Vector2(16, -3),
                new Vector2(24, 0), new Vector2(16, 4), new Vector2(5, 8), new Vector2(-8, 10),
                new Vector2(-3, 4), new Vector2(-10, 0), new Vector2(-3, -4)
            ]
        })

        //middle
        this.addComponent(new Polygon(), {
            fillStyle: "orange",

            points: [
                new Vector2(-5, -6), new Vector2(7, -5), new Vector2(17, -2), new Vector2(20, 0),
                new Vector2(12, 4), new Vector2(3, 6), new Vector2(-5, 5), new Vector2(0, 0)
            ]
        })

        //yellow
        this.addComponent(new Polygon(), {
            fillStyle: "yellow",

            points: [
                new Vector2(-2, -3), new Vector2(6, -3), new Vector2(13, -1), new Vector2(16, 0), new Vector2(9, 2),
                new Vector2(2, 3), new Vector2(-2, 2)
            ]
        })
    }
}
