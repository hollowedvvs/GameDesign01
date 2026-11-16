class LeafyController extends BaseEnemyController {
    fireCooldown = 1500
    timeSinceLastPea = 1500

    update() {
        if (!this.updateBase()) return

        this.timeSinceLastPea += GameTime.fixedDelta
        if (!this.player || this.playerDifference.magnitude > (this.gameObject.settings.detectionRange ?? 0)) return

        //aim in eight directions
        let direction = Direction8.snap(this.getAimDirection())
        let head = this.gameObject.head

        if (head) head.transform.rotation = Math.atan2(direction.y, direction.x)

        //wait between shots
        if (this.timeSinceLastPea < this.fireCooldown) return
        this.timeSinceLastPea = 0

        //spawn pea from muzzle
        if (head && head.muzzle) {
            let spawnPosition = TransformHelpers.getWorldPosition(head.muzzle.transform)
            gameInstantiate(new EnemyPeaGameObject(direction), spawnPosition)
        }
    }
}