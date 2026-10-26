class LeafyGameObject extends BaseEnemyGameObject {
    head = null

    constructor() {
        super("Leafy", 2, {
            detectionRange: 600,
            absorbPower: "pea"
        })
        //custom leafy hitbox
        let collider = this.getComponent(Collider)
        collider.width = 20
        collider.height = 20
        collider.offsetX = 0
        collider.offsetY = 0

        //combat hitbox
        let hitbox = new PolygonHitbox()

        this.addComponent(hitbox, {
            //main body
            points: [
                new Vector2(-15, -30),
                new Vector2(15, -30),
                new Vector2(15, 0),
                new Vector2(-15, 0)
            ]
        })

        //left leg
        hitbox.addShape([
            new Vector2(-18, 0),
            new Vector2(-3, 0),
            new Vector2(-3, 20),
            new Vector2(-18, 20)
        ])

        //right leg
        hitbox.addShape([
            new Vector2(3, 0),
            new Vector2(18, 0),
            new Vector2(18, 20),
            new Vector2(3, 20)
        ])

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

        this.addEnemyController(new LeafyController())
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