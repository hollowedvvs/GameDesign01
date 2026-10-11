class ProjectileGameObject extends GameObject {
    constructor(name, tags, direction, rotationOffset = 0) {

        //all projectiles use the projectile layer
        super(name, tags, "projectiles")

        //all projectiles rotate based on their direction
        this.transform.rotation = Math.atan2(direction.y, direction.x) + rotationOffset
    }

    addProjectileController(controller, direction) {

        //all projectile controllers need a direction
        this.addComponent(controller, {
            direction: direction
        })
    }
}
