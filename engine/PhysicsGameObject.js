class PhysicsGameObject extends GameObject {
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
}