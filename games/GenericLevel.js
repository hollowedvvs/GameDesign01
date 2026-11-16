
class GenericLevel extends Scene {
    //custom level physics
    //levels can override these for things like ice or underwater movement
    gravity = 0.8
    airFriction = 0.03

    constructor() {
        //shared level background uses the class Scene constructor
        super("Cyan")

        //player
        let playerGameObject = this.instantiate(new PlayerGameObject(), new Vector2(50, 50))

        //player power star
        let starGameObject = this.instantiate(new PlayerStarGameObject(), new Vector2(0, 0))

        //star uses player as its transform parent
        //0,0 keeps the star in the same spot it was before
        starGameObject.transform.setParent(playerGameObject.transform)

        //points ui
        this.instantiate(new PointsGameObject(), new Vector2(20, 30))
    }
}
