class Level01 extends GenericLevel {
    constructor() {
        //generic level handles player, star, points, and shared setup
        super()

        //old player setup
        //now handled by GenericLevel
        //this.instantiate(new PlayerGameObject(), new Vector2(50, 50))

        //blanket ground
        this.instantiate(new GroundGameObject(), new Vector2(0, 480))

        //enemy
        this.instantiate(new EnemyGameObject(), new Vector2(150, 270))

        //old points setup
        //now handled by GenericLevel
        //this.instantiate(new PointsGameObject(), new Vector2(20, 30))

        //loads next level
        this.instantiate(new LevelControllerGameObject(Level02))
    }
}