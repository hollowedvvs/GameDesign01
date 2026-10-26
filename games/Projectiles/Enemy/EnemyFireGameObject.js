class EnemyFireGameObject extends ProjectileGameObject {
    constructor(direction) {

        //old gameobject parent
        //super(
        //   "EnemyFire",
        //   ["EnemyProjectile", "EnemyFire"],
        //   "projectiles"
        //)

        //projectile parent handles name, tags, layer, and rotation
        super("EnemyFire", ["EnemyProjectile", "EnemyFire"], direction)

        //old transform rotation
        //now handled by ProjectileGameObject
        //this.transform.rotation =
        //   Math.atan2(direction.y, direction.x)

        //old controller setup
        //this.addComponent(
        //   new EnemyFireController(),
        //   {
        //       direction: direction
        //   }
        //)

        //projectile parent handles passing direction
        this.addProjectileController(new EnemyFireController(), direction)

        //old polygon rotation system
        //let rotation =
        //   Math.atan2(direction.y, direction.x)

        //outer
        this.addComponent(new Polygon(), {
            fillStyle: "darkred",

            //old polygon rotation
            //rotation: rotation,

            points: [
                new Vector2(-8, -10), new Vector2(6, -7), new Vector2(16, -3), new Vector2(24, 0),
                new Vector2(16, 4), new Vector2(5, 8), new Vector2(-8, 10), new Vector2(-3, 4),
                new Vector2(-10, 0), new Vector2(-3, -4)
            ]
        })

        //flame
        this.addComponent(new Polygon(), {
            fillStyle: "red",

            //old polygon rotation
            //rotation: rotation,

            points: [
                new Vector2(-5, -6), new Vector2(7, -5), new Vector2(17, -2), new Vector2(20, 0), 
                new Vector2(12, 4), new Vector2(3, 6), new Vector2(-5, 5), new Vector2(0, 0)
            ]
        })

        //center
        this.addComponent(new Polygon(), {
            fillStyle: "orange",

            //old polygon rotation
            //rotation: rotation,

            points: [
                new Vector2(-2, -3), new Vector2(6, -3), new Vector2(13, -1), new Vector2(16, 0),
                new Vector2(9, 2), new Vector2(2, 3), new Vector2(-2, 2)
            ]
        })
    }
}
