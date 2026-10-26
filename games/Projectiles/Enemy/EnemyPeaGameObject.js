class EnemyPeaGameObject extends ProjectileGameObject {
    constructor(direction) {

        //old gameobject parent
        //super("EnemyPea", ["EnemyProjectile"], "projectiles")

        //projectile parent handles name, tags, layer, and rotation
        super("EnemyPea", ["EnemyProjectile"], direction, Math.PI / 2)

        //old number layer
        //this.layer = -1

        //old transform rotation
        //now handled by ProjectileGameObject
        //this.transform.rotation =
        //   Math.atan2(direction.y, direction.x) + Math.PI / 2

        //old controller setup
        //this.addComponent(new EnemyPeaController(), {
        //   direction: direction
        //})

        //projectile parent handles passing direction
        this.addProjectileController(new EnemyPeaController(), direction)

        //enemy pea shape
        this.addComponent(new Polygon(), {
            fillStyle: "#19ff29",

            //old polygon rotation
            //rotation: Math.atan2(direction.y, direction.x) + Math.PI / 2,

            points: [
                new Vector2(-5, -15), new Vector2(5, -15), new Vector2(5, 15), new Vector2(-5, 15),
            ]
        })
    }
}
