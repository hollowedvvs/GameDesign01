
class PlayerAbsorbController extends Component {
    absorbRange = 180
    suctionDuration = 1000
    absorbCooldown = 500

    pullStartSpeed = 2
    pullMaxSpeed = 8
    pullAcceleration = 8
    currentPullSpeed = 2

    suctionTimer = 0
    cooldownTimer = 500
    absorbTarget = null
    targetGravityScale = null

    suctionActive = false
    waitingForRelease = false

    update() {
        this.cooldownTimer += GameTime.fixedDelta
        let holdingE = Input.keysDown.includes("KeyE")

        //requires releasing e before another suction
        if (this.waitingForRelease) {
            if (!holdingE) this.waitingForRelease = false
            return
        }

        //start suction
        if (!this.suctionActive) {
            if (!holdingE || this.cooldownTimer < this.absorbCooldown) return
            this.suctionActive = true
            this.suctionTimer = 0
        }

        //release suction
        if (!holdingE) {
            this.stopSuction()
            return
        }

        //find closest absorbable enemy
        if (!this.absorbTarget || this.absorbTarget.markForDestroy) {
            let target = this.findAbsorbTarget()
            if (target) this.setAbsorbTarget(target)
        }

        if (this.absorbTarget) {
            if (this.targetInsidePlayer(this.absorbTarget)) {
                this.finishAbsorb()
                return
            }
            this.pullEnemy(this.absorbTarget)
        }

        this.suctionTimer += GameTime.fixedDelta

        //suction lasts one second
        if (this.suctionTimer >= this.suctionDuration) {
            this.stopSuction()
            this.waitingForRelease = true
        }
    }

    setAbsorbTarget(enemy) {
        this.absorbTarget = enemy
        this.currentPullSpeed = this.pullStartSpeed

        //disable gravity during suction
        this.targetGravityScale = enemy.gravityScale
        enemy.gravityScale = 0

        let momentum = enemy.getComponent(Momentum)
        if (momentum) {
            momentum.velocityX = 0
            momentum.velocityY = 0
        }

        //allow static enemies to move through collisions
        let collider = enemy.getComponent(GameCollider)
        if (collider && collider.isStatic) collider.isTrigger = true
    }

    findAbsorbTarget() {
        let enemies = GameObject.findGameObjectsWithTag("Enemy")
        let absorbPosition = this.getAbsorbPosition()
        let closestEnemy = null
        let closestDistance = Infinity

        for (const enemy of enemies) {
            if (enemy.markForDestroy || !enemy.absorbPower) continue

            let difference = enemy.getCenterPosition().minus(absorbPosition)
            let distance = difference.magnitude

            if (distance > this.absorbRange) continue

            if (distance < closestDistance) {
                closestEnemy = enemy
                closestDistance = distance
            }
        }
        return closestEnemy
    }

    getAbsorbPosition() {
        let stars = GameObject.findGameObjectsWithTag("PlayerPower")
        if (stars.length == 0) return this.gameObject.getCenterPosition()

        let starPosition = TransformHelpers.getWorldPosition(stars[0].transform)
        return starPosition.plus(new Vector2(10,-30))
    }

    targetInsidePlayer(enemy) {
        let absorbPosition = this.getAbsorbPosition()
        let enemyPosition = enemy.getCenterPosition()
        let playerHitbox = this.gameObject.getComponent(PolygonHitbox)
        let enemyHitbox = enemy.getComponent(PolygonHitbox)

        //combat hitbox overlap
        if (playerHitbox && playerHitbox.containsPoint(enemyPosition)) return true
        if (enemyHitbox && enemyHitbox.containsPoint(absorbPosition)) return true

        //physical collider overlap
        let playerCollider = this.gameObject.getComponent(Collider)
        let enemyCollider = enemy.getComponent(Collider)

        if (playerCollider && enemyCollider) {
            let difference = enemyPosition.minus(absorbPosition)
            let overlapX = Math.abs(difference.x) <= playerCollider.width / 2 + enemyCollider.width / 2
            let overlapY = Math.abs(difference.y) <= playerCollider.height / 2 + enemyCollider.height / 2

            if (overlapX && overlapY) return true
        }

        return false
    }

    pullEnemy(enemy) {
        let momentum = enemy.getComponent(Momentum)

        //accelerate suction
        let seconds = GameTime.fixedDelta / 1000
        this.currentPullSpeed += this.pullAcceleration * seconds
        if (this.currentPullSpeed > this.pullMaxSpeed) this.currentPullSpeed = this.pullMaxSpeed

        let absorbPosition = this.getAbsorbPosition()
        let enemyPosition = enemy.getCenterPosition()
        let difference = absorbPosition.minus(enemyPosition)
        let distance = difference.magnitude

        if (distance == 0) {
            if (momentum) {
                momentum.velocityX = 0
                momentum.velocityY = 0
            }
            return
        }

        let directionX = difference.x / distance
        let directionY = difference.y / distance

        if (momentum) {
            //moving enemies use momentum
            momentum.velocityX = directionX * this.currentPullSpeed
            momentum.velocityY = directionY * this.currentPullSpeed
        }
        else {
            //static enemies move directly during suction
            let step = Math.min(this.currentPullSpeed, distance)
            enemy.transform.position.x += directionX * step
            enemy.transform.position.y += directionY * step
        }
    }

    releaseTarget() {
        if (this.absorbTarget) {
            //restore gravity
            if (this.targetGravityScale != null) {
                this.absorbTarget.gravityScale = this.targetGravityScale
            }

            //stop enemy movement
            let momentum = this.absorbTarget.getComponent(Momentum)
            if (momentum) {
                momentum.velocityX = 0
                momentum.velocityY = 0
            }

            //restore static collision
            let collider = this.absorbTarget.getComponent(GameCollider)
            if (collider && collider.isStatic) collider.isTrigger = false
        }

        this.absorbTarget = null
        this.targetGravityScale = null
        this.currentPullSpeed = this.pullStartSpeed
    }

    finishAbsorb() {
        let powerController = this.gameObject.getComponent(PlayerPowerController)

        if (!powerController || !this.absorbTarget) {
            this.stopSuction()
            return
        }

        //transfer enemy power
        powerController.setPower(this.absorbTarget.absorbPower)
        this.absorbTarget.destroy()

        this.absorbTarget = null
        this.targetGravityScale = null
        this.currentPullSpeed = this.pullStartSpeed

        this.suctionActive = false
        this.suctionTimer = 0
        this.cooldownTimer = 0
        this.waitingForRelease = true
    }

    stopSuction() {
        this.releaseTarget()
        this.suctionActive = false
        this.suctionTimer = 0
        this.cooldownTimer = 0
    }
}
