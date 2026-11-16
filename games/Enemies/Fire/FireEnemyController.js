class FireEnemyController extends BaseEnemyController {
    patrolDirection = 1
    attackState = "idle"
    attackTimer = 0
    timeSinceLastFire = 0
    attackDirection = 1

    start() {
        this.homeX = this.transform.position.x
    }

    update() {
        let settings = this.gameObject.settings
        let momentum = this.gameObject.getComponent(Momentum)
        let collider = this.gameObject.getComponent(Collider)
        let onGround = collider ? collider.grounded : false

        if (!this.updateBase()) return

        let moveDirection = this.patrolDirection

        if (this.player) {
            let direction = this.playerDirection
            if (direction === 0) direction = this.attackDirection

            let detected = this.playerDetected()

            //attack windup
            if (this.attackState === "windup") {
                moveDirection = 0
                this.attackTimer += GameTime.fixedDelta

                if (this.attackTimer >= settings.attackWindup) {
                    this.attackState = "firing"
                    this.attackTimer = 0
                    this.timeSinceLastFire = settings.fireRate
                }
            }
            //fire burst
            else if (this.attackState === "firing") {
                moveDirection = 0
                this.attackTimer += GameTime.fixedDelta
                this.timeSinceLastFire += GameTime.fixedDelta

                if (this.timeSinceLastFire >= settings.fireRate) {
                    this.timeSinceLastFire = 0
                    gameInstantiate(new EnemyFireGameObject(new Vector2(this.attackDirection, 0)), this.gameObject.getCenterPosition())
                }

                if (this.attackTimer >= settings.attackDuration) {
                    this.attackState = "cooldown"
                    this.attackTimer = 0
                }
            }
            //attack cooldown
            else if (this.attackState === "cooldown") {
                moveDirection = 0
                this.attackTimer += GameTime.fixedDelta

                if (this.attackTimer >= settings.attackCooldown) {
                    this.attackState = "idle"
                    this.attackTimer = 0
                }
            }
            //patrol or chase
            else {
                if (detected) {
                    if (this.playerDistanceX <= settings.attackRange) {
                        this.attackDirection = direction
                        this.facePlayer()
                        this.attackState = "windup"
                        this.attackTimer = 0
                        moveDirection = 0
                    }
                    else {
                        moveDirection = direction
                        this.facePlayer()
                    }
                }
                else {
                    if (this.transform.position.x >= this.homeX + settings.patrolDistance) this.patrolDirection = -1
                    else if (this.transform.position.x <= this.homeX - settings.patrolDistance) this.patrolDirection = 1

                    moveDirection = this.patrolDirection
                    this.gameObject.flipX = moveDirection < 0
                }
            }
        }

        //movement and friction
        if (moveDirection !== 0) {
            if (Math.abs(momentum.velocityX) < settings.maxSpeed || Math.sign(momentum.velocityX) !== moveDirection) {
                momentum.addForce(settings.acceleration * moveDirection, 0)
            }
        }
        else {
            let friction = onGround ? collider.surfaceFriction : SceneManager.currentScene.airFriction
            momentum.applyFriction(friction)
        }
    }
}