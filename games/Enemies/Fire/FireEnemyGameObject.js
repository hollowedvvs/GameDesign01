class FireEnemyGameObject extends BaseEnemyGameObject {
    constructor() {
        super("FireEnemy", 4, {
            detectionRange: 350, verticalDetectionRange: 80,
            acceleration: 0.20, maxSpeed: 1.5, patrolDistance: 120,
            attackRange: 200, attackWindup: 400,
            attackDuration: 1200, attackCooldown: 1800, fireRate: 120,
            absorbPower: "fire"
        })

        //physical collision
        let collider = this.getComponent(GameCollider)
        collider.width = 40
        collider.height = 40

        //shared appearance and combat shape
        let points = [new Vector2(-20,-20), new Vector2(20,-20), new Vector2(20,20), new Vector2(-20,20)]

        this.addComponent(new PolygonHitbox(), { points })
        this.addComponent(new Polygon(), { fillStyle: "red", points })
        this.addComponent(new FireEnemyController())
    }
}