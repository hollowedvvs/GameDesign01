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

        //requires releasing e before another suction
        if (this.waitingForRelease) {
            if (!GameInput.getKey("KeyE")) {
                this.waitingForRelease = false
            }

            return
        }

        //starts suction when e is held
        if (!this.suctionActive) {
            if (!GameInput.getKey("KeyE")) {
                return
            }

            if (this.cooldownTimer < this.absorbCooldown) {
                return
            }

            this.startSuction()
        }

        //releasing e ends suction early
        if (!GameInput.getKey("KeyE")) {
            this.stopSuction()
            return
        }

        //finds a target if there is not one already
        if (!this.absorbTarget || this.absorbTarget.markForDestroy) {
            let target = this.findAbsorbTarget()

            if (target) {
                this.setAbsorbTarget(target)
            }
        }

        if (this.absorbTarget) {
            //absorbs immediately once the objects overlap
            if (this.targetInsidePlayer(this.absorbTarget)) {
                this.finishAbsorb()
                return
            }

            //marked enemy always moves directly toward star
            this.pullEnemy(this.absorbTarget)
        }

        this.suctionTimer += GameTime.fixedDelta

        //suction only lasts one second
        if (this.suctionTimer >= this.suctionDuration) {
            this.stopSuction()
            this.waitingForRelease = true
        }
    }

    startSuction() {
        this.suctionActive = true
        this.suctionTimer = 0
    }

    setAbsorbTarget(enemy) {
        this.absorbTarget = enemy
        this.currentPullSpeed = this.pullStartSpeed

        //saves gravity before suction disables it
        this.targetGravityScale = enemy.gravityScale
        enemy.gravityScale = 0

        //suction takes control of enemy movement
        let momentum = enemy.getComponent(Momentum)

        if (momentum) {
            momentum.velocityX = 0
            momentum.velocityY = 0
        }
    }

    findAbsorbTarget() {
        let enemies = GameObject.findGameObjectsWithTag("Enemy")
        let absorbPosition = this.getAbsorbPosition()

        let closestEnemy = null
        let closestDistance = Infinity

        for (const enemy of enemies) {
            if (enemy.markForDestroy || !enemy.absorbPower) {
                continue
            }

            let enemyPosition = enemy.getCenterPosition()
            let difference = enemyPosition.minus(absorbPosition)
            let distance = difference.magnitude

            //only marks enemies inside initial circular range
            if (distance > this.absorbRange) {
                continue
            }

            //uses closest enemy inside the circle
            if (distance < closestDistance) {
                closestEnemy = enemy
                closestDistance = distance
            }
        }

        return closestEnemy
    }

    getAbsorbPosition() {
        let stars = GameObject.findGameObjectsWithTag("PlayerPower")

        //uses player center if star cannot be found
        if (stars.length == 0) {
            return this.gameObject.getCenterPosition()
        }

        let starPosition = TransformHelpers.getWorldPosition(stars[0].transform)

        //actual center of visible star
        return starPosition.plus(new Vector2(10, -30))
    }

    targetInsidePlayer(enemy) {
        let absorbPosition = this.getAbsorbPosition()
        let enemyPosition = enemy.getCenterPosition()

        let playerHitbox = this.gameObject.getComponent(PolygonHitbox)
        let enemyHitbox = enemy.getComponent(PolygonHitbox)

        //enemy center entered player hitbox
        if (playerHitbox && playerHitbox.containsPoint(enemyPosition)) {
            return true
        }

        //star center entered enemy hitbox
        if (enemyHitbox && enemyHitbox.containsPoint(absorbPosition)) {
            return true
        }

        //physical colliders overlap
        let playerCollider = this.gameObject.getComponent(Collider)
        let enemyCollider = enemy.getComponent(Collider)

        if (playerCollider && enemyCollider) {
            let difference = enemyPosition.minus(absorbPosition)

            let overlapX = Math.abs(difference.x) <= playerCollider.width / 2 + enemyCollider.width / 2
            let overlapY = Math.abs(difference.y) <= playerCollider.height / 2 + enemyCollider.height / 2

            if (overlapX && overlapY) {
                return true
            }
        }

        return false
    }

    pullEnemy(enemy) {
        let momentum = enemy.getComponent(Momentum)

        if (!momentum) {
            return
        }

        //accelerates suction speed over time
        let seconds = GameTime.fixedDelta / 1000
        this.currentPullSpeed += this.pullAcceleration * seconds

        if (this.currentPullSpeed > this.pullMaxSpeed) {
            this.currentPullSpeed = this.pullMaxSpeed
        }

        //always aims directly at current star position
        let absorbPosition = this.getAbsorbPosition()
        let enemyPosition = enemy.getCenterPosition()
        let difference = absorbPosition.minus(enemyPosition)
        let distance = difference.magnitude

        if (distance == 0) {
            momentum.velocityX = 0
            momentum.velocityY = 0
            return
        }

        let directionX = difference.x / distance
        let directionY = difference.y / distance

        //direct velocity prevents orbiting while speed ramps up
        momentum.velocityX = directionX * this.currentPullSpeed
        momentum.velocityY = directionY * this.currentPullSpeed
    }

    stopTargetMomentum() {
        if (!this.absorbTarget) {
            return
        }

        let momentum = this.absorbTarget.getComponent(Momentum)

        if (!momentum) {
            return
        }

        momentum.velocityX = 0
        momentum.velocityY = 0
    }

    restoreTargetGravity() {
        if (!this.absorbTarget || this.targetGravityScale == null) {
            return
        }

        this.absorbTarget.gravityScale = this.targetGravityScale
        this.targetGravityScale = null
    }

    releaseTarget() {
        this.restoreTargetGravity()
        this.stopTargetMomentum()

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

        //takes enemy power immediately
        powerController.setPower(this.absorbTarget.absorbPower)

        //enemy disappears immediately on contact
        this.absorbTarget.destroy()

        this.absorbTarget = null
        this.targetGravityScale = null
        this.currentPullSpeed = this.pullStartSpeed

        //successful absorb ends this suction
        this.suctionActive = false
        this.suctionTimer = 0
        this.cooldownTimer = 0
        this.waitingForRelease = true
    }

    stopSuction() {
        //unmarks enemy if suction ends early
        this.releaseTarget()

        this.suctionActive = false
        this.suctionTimer = 0
        this.cooldownTimer = 0
    }
}