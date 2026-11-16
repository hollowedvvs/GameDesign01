class PhysicsGameObject extends GameObject {
    flipX = false
    gravityScale = 1

    constructor(name, tags = [], layer = "default") {
        super(name, tags, layer)

        //shared physics components
        this.addComponent(new Momentum())
        this.addComponent(new GameCollider(), { width: 20, height: 20 })
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