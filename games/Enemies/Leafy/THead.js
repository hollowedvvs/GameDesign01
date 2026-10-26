class THead extends GameObject {
    muzzle = null

    constructor() {
        super("THead", ["EnemyChild", "THead"], "Enemies")

        //old collider
        //combat collision is handled by Leafy's PolygonHitbox
        /*
        this.addComponent(new Collider(), {
            width: 30, height: 30,
            offsetX: 0, offsetY: 0
        })
        */
        
        //main leafy head
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [new Vector2(-15, -15), new Vector2(15, -15), new Vector2(15, 15), new Vector2(-15, 15)]
        })

        //front of head
        //points right by default so rotation shows direction
        this.addComponent(new Polygon(), {
            fillStyle: "darkgreen",
            points: [new Vector2(15, -5), new Vector2(25, -5), new Vector2(25, 5), new Vector2(15, 5)]
        })
    }

    start() {
        super.start()

        if (this.muzzle) {
            return
        }

        this.muzzle = instantiate(new TMuzzle(), new Vector2(25, 0))
        this.muzzle.transform.setParent(this.transform)
    }

    destroy() {
        if (this.muzzle) {
            this.muzzle.destroy()
        }

        super.destroy()
    }
}