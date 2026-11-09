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

        //old camera background setup
        //scene now gets the shared color through super("Cyan")
        //this.mainCamera.backgroundColor = "Cyan"

        //old parent child test
        //player star now handles the real parent child example
        /*
        let helperGameObject = this.instantiate(new HelperGameObject(), new Vector2(50, 50))

        helperGameObject.transform.setParent(mainGameObject.transform)
        */
    }

    update() {
        //old order reset grounding after class collisions
        //super.update()
        //CollisionManager.update()

        //clear old contact data before class collisions run
        CollisionManager.update()
        super.update()
    }
}
