class Level01 extends GenericLevel {
    constructor() {
        //generic level handles player, star, points, and shared setup
        super()

        //blanket ground
        this.instantiate(new GroundGameObject(), new Vector2(0, 480))

        //enemy
        this.instantiate(new LeafyGameObject(), new Vector2(150, 470))

        //loads next level
        this.instantiate(new LevelControllerGameObject(Level02))
    }
}