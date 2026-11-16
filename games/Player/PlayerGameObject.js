
class PlayerGameObject extends PhysicsGameObject {
    constructor() {
        super("Player", ["Player"], "Player")

        //physical collision
        let collider = this.getComponent(Collider)
        collider.width = 30
        collider.height = 30
        collider.offsetX = 0
        collider.offsetY = 0

        //combat hitbox
        this.addComponent(new PolygonHitbox(), {
            points: [new Vector2(10,-80), new Vector2(60,-30), new Vector2(10,20), new Vector2(-40,-30)]
        })

        //player controls
        this.addComponent(new UpdateComponent())
        this.addComponent(new PlayerPowerController())
        this.addComponent(new PlayerAbsorbController())
    }
}
