class LeafyGameObject extends BaseEnemyGameObject {
    head = null

    constructor() {
        super("Leafy", 2, { detectionRange: 600, absorbPower: "pea" })

        //stationary physical collider
        this.getComponent(GameCollider).isStatic = true

        //remove momentum so normal collisions cannot move leafy
        this.components = this.components.filter(c => !(c instanceof Momentum))
        this.gravityScale = 0

        //leg shapes shared between hitbox and appearance
        let leftLeg = [new Vector2(-18,0), new Vector2(-3,0), new Vector2(-3,20), new Vector2(-18,20)]
        let rightLeg = [new Vector2(3,0), new Vector2(18,0), new Vector2(18,20), new Vector2(3,20)]

        //combat hitbox
        let hitbox = new PolygonHitbox()
        this.addComponent(hitbox, {
            points: [new Vector2(-15,-30), new Vector2(15,-30), new Vector2(15,0), new Vector2(-15,0)]
        })

        hitbox.addShape(leftLeg)
        hitbox.addShape(rightLeg)

        //visible legs
        this.addComponent(new Polygon(), { fillStyle: "green", points: leftLeg })
        this.addComponent(new Polygon(), { fillStyle: "green", points: rightLeg })

        this.addComponent(new LeafyController())
    }

    start() {
        super.start()
        if (this.head) return

        this.head = instantiate(new THead(), new Vector2(0,-15))
        this.head.transform.setParent(this.transform)
    }

    destroy() {
        if (this.head) this.head.destroy()
        super.destroy()
    }
}