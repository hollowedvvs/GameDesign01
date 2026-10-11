class EnemyGameObject extends BaseEnemyGameObject {
    head = null

    constructor() {
        super("Leafy", 2, 600)

        //Leafy is static but still keeps momentum for knockback
        this.gravityScale = 0

        //old square placeholder
        /*
        this.addEnemyShape("green")
        */

        //left leg
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [new Vector2(-18, 0), new Vector2(-3, 0), new Vector2(-3, 20), new Vector2(-18, 20)]
        })

        //right leg
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [new Vector2(3, 0), new Vector2(18, 0), new Vector2(18, 20), new Vector2(3, 20)]
        })

        this.addEnemyController(new EnemyController())
    }

    start() {
        super.start()

        //old head setup
        //this used to create another head every time start ran
        /*
        this.head = instantiate(new THead(), new Vector2(0, -15))
        this.head.transform.setParent(this.transform)
        */

        if (this.head) {
            return
        }

        this.head = instantiate(new THead(), new Vector2(0, -15))
        this.head.transform.setParent(this.transform)
    }

    destroy() {
        if (this.head) {
            this.head.destroy()
        }

        super.destroy()
    }
}