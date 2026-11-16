class THead extends GameObject {
    muzzle = null

    constructor() {
        super("THead", ["EnemyChild", "THead"], "Enemies")

        //main head
        this.addComponent(new Polygon(), {
            fillStyle: "green",
            points: [new Vector2(-15,-15), new Vector2(15,-15), new Vector2(15,15), new Vector2(-15,15)]
        })

        //front of head
        this.addComponent(new Polygon(), {
            fillStyle: "darkgreen",
            points: [new Vector2(15,-5), new Vector2(25,-5), new Vector2(25,5), new Vector2(15,5)]
        })
    }

    start() {
        super.start()
        if (this.muzzle) return

        this.muzzle = instantiate(new TMuzzle(), new Vector2(25,0))
        this.muzzle.transform.setParent(this.transform)
    }

    destroy() {
        if (this.muzzle) this.muzzle.destroy()
        super.destroy()
    }
}