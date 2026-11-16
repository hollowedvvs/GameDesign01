//loads the next level after all enemies are cleared
class LevelController extends Component {
    nextLevel = null

    update() {
        let enemies = GameObject.findGameObjectsWithTag("Enemy")

        if (this.nextLevel && enemies.length === 0) {
            SceneManager.loadScene(this.nextLevel)
            this.nextLevel = null
        }
    }
}