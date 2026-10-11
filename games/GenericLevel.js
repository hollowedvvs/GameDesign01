class GenericLevel extends Scene {
    constructor() {
        super()

        //player
        let playerGameObject = this.instantiate(new PlayerGameObject(), new Vector2(50, 50))

        //player power star
        let starGameObject = this.instantiate(new PlayerStarGameObject(), new Vector2(0, 0))

        //star uses player as its transform parent
        //0,0 keeps the star in the same spot it was before
        starGameObject.transform.setParent(playerGameObject.transform)

        //points ui
        this.instantiate(new PointsGameObject(), new Vector2(20, 30))

        //shared camera background
        this.mainCamera.backgroundColor = "Cyan"

        //old parent child test
        //player star now handles the real parent child example
        /*
        let helperGameObject = this.instantiate(new HelperGameObject(), new Vector2(50, 50))

        helperGameObject.transform.setParent(mainGameObject.transform)
        */
    }
}
