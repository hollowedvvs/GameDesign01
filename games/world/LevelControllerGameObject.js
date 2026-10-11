
class LevelControllerGameObject extends GameObject {
    constructor(nextLevel = null) {
        super("LevelControllerGameObject")

        this.addComponent(new LevelController(), {
            nextLevel
        })
    }
}
