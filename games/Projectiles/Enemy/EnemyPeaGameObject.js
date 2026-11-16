class EnemyPeaGameObject extends ProjectileGameObject {
    constructor(direction) {
        //projectile parent handles name, tags, layer, and rotation
        super("EnemyPea", ["EnemyProjectile"], direction, Math.PI / 2)

        //projectile parent handles passing direction
        this.addProjectileController(new EnemyPeaController(), direction)

        //enemy pea shape
        this.addComponent(new Polygon(), {
            fillStyle: "#19ff29",
            points: [
                new Vector2(-5, -15), new Vector2(5, -15), new Vector2(5, 15), new Vector2(-5, 15),
            ]
        })
    }
}
