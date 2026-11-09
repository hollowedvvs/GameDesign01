//shared parent for objects that use momentum, collision, gravity, and centered projectile spawning
class PhysicsGameObject extends GameObject {
    flipX = false
    gravityScale = 1

    constructor(name, tags = [], layer = "default") {
        super(name, tags, layer)

        //momentum now extends the class rigidbody
        this.addComponent(new Momentum())

        //old standalone collider
        //this.addComponent(new Collider(), { width: 20, height: 20 })
        this.addComponent(new GameCollider(), { width: 20, height: 20 })
    }

    update() {
        //controllers still update normally
        super.update()

        //old gravity and movement handled by momentum.fixedUpdate
        /*
        let momentum = this.getComponent(Momentum)
        if (!momentum) return
        momentum.applyGravity(SceneManager.currentScene.gravity * this.gravityScale)
        momentum.move()
        */
    }

    get momentum() {
        return this.getComponent(Momentum)
    }

    get collider() {
        return this.getComponent(Collider)
    }

    getCenterPosition() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        let collider = this.getComponent(Collider)

        if (!collider) return position

        position.x += collider.offsetX
        position.y += collider.offsetY
        return position
    }
}
