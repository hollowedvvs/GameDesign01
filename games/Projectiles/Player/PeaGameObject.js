class PeaGameObject extends ProjectileGameObject {
    constructor(direction) {
        //projectile parent handles name, tags, layer, and rotation
        super("Pea", ["PlayerProjectile"], direction, Math.PI / 2)

        //projectile parent handles passing direction
        this.addProjectileController(new PeaController(), direction)

        //pea shape
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [
                new Vector2(-5, -15),
                new Vector2(5, -15),
                new Vector2(5, 15),
                new Vector2(-5, 15),
            ]
        })
    }
}
