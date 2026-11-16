class BaseEnemyController extends Component {
    player = null
    playerDifference = new Vector2(0,0)
    playerDistanceX = 0
    playerDistanceY = 0
    playerDirection = 0

    updateBase() {
        if (this.checkDeath()) return false
        this.updateTarget()
        return true
    }

    checkDeath() {
        let health = this.gameObject.getComponent(Health)

        if (health && health.health <= 0) {
            this.gameObject.destroy()
            return true
        }
        return false
    }

    updateTarget() {
        let players = GameObject.findGameObjectsWithTag("Player")

        if (players.length == 0) {
            this.player = null
            this.playerDifference = new Vector2(0,0)
            this.playerDistanceX = 0
            this.playerDistanceY = 0
            this.playerDirection = 0
            return
        }

        this.player = players[0]
        this.playerDifference = this.player.transform.position.minus(this.transform.position)
        this.playerDistanceX = Math.abs(this.playerDifference.x)
        this.playerDistanceY = Math.abs(this.playerDifference.y)
        this.playerDirection = Math.sign(this.playerDifference.x)
    }

    playerDetected() {
        if (!this.player) return false

        return this.playerDistanceX <= (this.gameObject.settings.detectionRange ?? 0) &&
            this.playerDistanceY <= (this.gameObject.settings.verticalDetectionRange ?? 100)
    }

    facePlayer() {
        if (!this.player || this.playerDirection == 0) return
        this.gameObject.flipX = this.playerDirection < 0
    }

    getAimDirection() {
        if (!this.player) return new Vector2(0,0)

        let magnitude = this.playerDifference.magnitude
        if (magnitude == 0) return new Vector2(0,0)

        return new Vector2(this.playerDifference.x / magnitude, this.playerDifference.y / magnitude)
    }
}