class Level02 extends GenericLevel {
    constructor() {
        //generic level handles player, star, points, and shared setup
        super()

        //old scene parent
        //class Level02 extends Scene

        //loads level again after completion
        this.instantiate(new LevelControllerGameObject(Level02))

        //old player setup
        //now handled by GenericLevel
        //this.instantiate(new PlayerGameObject(), new Vector2(50, 50))

        //blanket ground
        this.instantiate(new GroundGameObject(), new Vector2(0, 480))

        //pea enemy
        this.instantiate(new EnemyGameObject(), new Vector2(150, 170))

        //pea enemy
        this.instantiate(new EnemyGameObject(), new Vector2(350, 270))

        //fire enemy
        this.instantiate(new FireEnemyGameObject(), new Vector2(350, 400))

        //old points setup
        //now handled by GenericLevel
        //this.instantiate(new PointsGameObject(), new Vector2(20, 30))
    }
}