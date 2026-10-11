class LaserGameObject extends ProjectileGameObject {
    constructor(direction) {

        //old gameobject parent
        //super("Pea", ["PlayerProjectile"], "projectiles")

        //projectile parent handles name, tags, layer, and rotation
        super("Pea", ["PlayerProjectile"], direction, Math.PI / 2)

        //old transform rotation
        //now handled by ProjectileGameObject
        //this.transform.rotation =
        //   Math.atan2(direction.y, direction.x) + Math.PI / 2

        //old controller setup
        //this.addComponent(new LaserController(), {
        //   direction: direction
        //})

        //projectile parent handles passing direction
        this.addProjectileController(new LaserController(), direction)

        //old laser
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

        //laser shape
        this.addComponent(new Polygon(), {
            fillStyle: "green",

            //old polygon rotation
            //rotation: Math.atan2(direction.y, direction.x) + Math.PI / 2,

            points: [
                new Vector2(-5, -15),
                new Vector2(5, -15),
                new Vector2(5, 15),
                new Vector2(-5, 15),
            ]
        })
    }
}
