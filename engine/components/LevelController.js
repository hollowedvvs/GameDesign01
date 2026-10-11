class LevelController extends Component {
    nextLevel = null

    start() {
        //old generic level loading
        //levels now extend GenericLevel directly
        //loading it again doubled player, points, camera, and other shared objects
        /*
        SceneManager.loadScene(GenericLevel, true)
        */
    }

    update() {
        let enemies = GameObject.findGameObjectsWithTag("Enemy")

        if (this.nextLevel && enemies.length === 0) {
            SceneManager.loadScene(this.nextLevel)

            this.nextLevel = null
        }
    }
}
