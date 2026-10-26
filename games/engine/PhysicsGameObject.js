//custom game code
//shared parent for objects that use momentum, collision, gravity, and centered projectile spawning
class PhysicsGameObject extends GameObject {
    flipX = false
    gravityScale = 1

    constructor(name, tags = [], layer = "default") {
        super(name, tags, layer)

        //all physical objects use momentum
        this.addComponent(new Momentum())

        //all physical objects use collision
        this.addComponent(new Collider(), { width: 20, height: 20 })
    }

    update() {
        //controllers and other components add forces first
        super.update()

        let momentum = this.getComponent(Momentum)

        if (!momentum) {
            return
        }

        //gravity comes from the current level
        momentum.applyGravity(SceneManager.currentScene.gravity * this.gravityScale)

        //applies all stored movement
        momentum.move()
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

        if (!collider) {
            return position
        }

        position.x += collider.offsetX
        position.y += collider.offsetY
        return position
    }
}
