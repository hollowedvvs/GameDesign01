class Level02 extends GenericLevel {
    constructor() {
        //generic level handles player, star, points, and shared setup
        super()
        
        //loads level again after completion
        this.instantiate(new LevelControllerGameObject(Level02))

        //blanket ground
        this.instantiate(new GroundGameObject(), new Vector2(0, 480))

        //pea enemy
        this.instantiate(new LeafyGameObject(), new Vector2(150, 170))

        //pea enemy
        this.instantiate(new LeafyGameObject(), new Vector2(350, 270))

        //fire enemy
        this.instantiate(new FireEnemyGameObject(), new Vector2(350, 400))
    }
}