class FireEnemyGameObject extends BaseEnemyGameObject {
    constructor() {

        //old enemy setup
        //super(
        //   "FireEnemy",
        //   4
        //)

        //old detection only setup
        //super("FireEnemy", 4, 350)

        //base enemy handles tags, health, momentum, detection, and settings
        super("FireEnemy", 4, {
            detectionRange: 350, verticalDetectionRange: 80, acceleration: 0.20, maxSpeed: 1.5,
            patrolDistance: 120, attackRange: 200, attackWindup: 400,
            attackDuration: 1200, attackCooldown: 1800, fireRate: 120
        })

        //old square placeholder
        /*
        this.addComponent(new Polygon(), {
            fillStyle: "red",
            points: [new Vector2(-20, -20), new Vector2(20, -20), new Vector2(20, 20), new Vector2(-20, 20)]
        })
        */

        //base enemy handles temporary square setup
        this.addEnemyShape("red")

        //old controller setup
        //this.addComponent(
        //   new FireEnemyController()
        //)

        //base enemy handles controller setup
        this.addEnemyController(new FireEnemyController())

        //old momentum setup
        //momentum is now handled by BaseEnemyGameObject
        //this.addComponent(
        //   new Momentum()
        //)

        //old health setup
        //health is now handled by BaseEnemyGameObject
        //this.addComponent(
        //   new Health(),
        //   {
        //       health: 4
        //   }
        //)
    }
}