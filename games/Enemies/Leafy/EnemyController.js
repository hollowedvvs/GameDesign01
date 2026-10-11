class EnemyController extends BaseEnemyController {
    fireCooldown = 1500
    timeSinceLastLaser = 1500

    //leafy remembers where its head was last pointing
    lastDirection = new Vector2(1, 0)

    start() {
        this.timeSinceLastLaser = this.fireCooldown
    }

    update() {
        //base enemy handles death and finding the player
        if (!this.updateBase()) {
            return
        }

        this.timeSinceLastLaser += Engine.fixedDelta

        if (!this.player) {
            return
        }

        //player is outside leafy's detection
        //head stays pointing in its last direction
        if (this.playerDifference.magnitude > this.getDetectionRange()) {
            return
        }

        //old free angle aim
        /*
        let direction = this.getAimDirection()
        */

        //snaps leafy to one of 8 compass directions
        let direction = Direction8.snap(this.getAimDirection())

        //remembers last direction
        this.lastDirection = direction

        let head = this.gameObject.head

        if (head) {
            //head only moves in 45 degree steps
            head.transform.rotation = Direction8.getRotation(this.lastDirection)
        }

        //wait between shots
        if (this.timeSinceLastLaser < this.fireCooldown) {
            return
        }

        this.timeSinceLastLaser = 0

        //laser follows the same compass direction as leafy's head
        instantiate(new EnemyLaserGameObject(this.lastDirection), this.transform.position.clone())
    }
}
