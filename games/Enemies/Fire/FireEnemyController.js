class FireEnemyController extends BaseEnemyController {
    patrolDirection = 1

    //old movement settings
    //now handled by FireEnemyGameObject settings
    /*
    acceleration = 0.20
    maxSpeed = 1.5
    */

    //old gravity setting
    //gravity now comes from the scene and PhysicsGameObject
    //gravity = 0.8

    //old hardcoded ground
    //ground collision is now handled by Collider
    //groundY = 460

    //old patrol setting
    //now handled by FireEnemyGameObject settings
    //patrolDistance = 120

    //old detection setting
    //now handled by BaseEnemyController and enemy settings
    //verticalDetectionRange = 80

    //old attack range setting
    //now handled by FireEnemyGameObject settings
    //attackRange = 200

    //old attack settings
    //now handled by FireEnemyGameObject settings
    /*
    attackWindup = 400
    attackDuration = 1200
    attackCooldown = 1800
    fireRate = 120
    */

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

        //old health check
        /*
        let health = this.gameObject.getComponent(Health)

        if (health && health.health <= 0) {
            this.gameObject.destroy()
            return
        }
        */

        //base handles death player lookup distance and direction
        if (!this.updateBase()) {
            return
        }

        let moveDirection = this.patrolDirection

        //old player lookup
    
       // let players = GameObject.findGameObjectsWithTag("Player")

        // if (players.length > 0) {
        //     let player = players[0]
        //     let difference = player.transform.position.minus(this.transform.position)
        //     let horizontalDistance = Math.abs(difference.x)
        //     let verticalDistance = Math.abs(difference.y)
        //     let playerDirection = Math.sign(difference.x)
        // }
    

        if (this.player) {
            let direction = this.playerDirection

            if (direction === 0) {
                direction = this.attackDirection
            }

            //old detection system
            
            // let playerDetected =
            //     horizontalDistance <= this.detectionRange &&
            //     verticalDistance <= this.verticalAttackRange
            

            let detected = this.playerDetected()

            //windup
            if (this.attackState === "windup") {
                moveDirection = 0
                this.attackTimer += Engine.fixedDelta

                if (this.attackTimer >= settings.attackWindup) {
                    this.attackState = "firing"
                    this.attackTimer = 0
                    this.timeSinceLastFire = settings.fireRate
                }
            }

            //firing burst
            else if (this.attackState === "firing") {
                moveDirection = 0
                this.attackTimer += Engine.fixedDelta
                this.timeSinceLastFire += Engine.fixedDelta

                if (this.timeSinceLastFire >= settings.fireRate) {
                    this.timeSinceLastFire = 0

                    instantiate(
                        new EnemyFireGameObject(new Vector2(this.attackDirection, 0)),
                        this.transform.position.clone()
                    )
                }

                if (this.attackTimer >= settings.attackDuration) {
                    this.attackState = "cooldown"
                    this.attackTimer = 0
                }
            }

            //delay between bursts
            else if (this.attackState === "cooldown") {
                moveDirection = 0
                this.attackTimer += Engine.fixedDelta

                if (this.attackTimer >= settings.attackCooldown) {
                    this.attackState = "idle"
                    this.attackTimer = 0
                }
            }

            //normal patrol / chase
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
                    if (this.transform.position.x >= this.homeX + settings.patrolDistance) {
                        this.patrolDirection = -1
                    }

                    else if (this.transform.position.x <= this.homeX - settings.patrolDistance) {
                        this.patrolDirection = 1
                    }

                    moveDirection = this.patrolDirection
                    this.gameObject.flipX = moveDirection < 0
                }
            }
        }

        //movement
        if (moveDirection !== 0) {
            if (Math.abs(momentum.velocityX) < settings.maxSpeed || Math.sign(momentum.velocityX) !== moveDirection) {
                //old direct momentum change
                //momentum.velocityX += settings.acceleration * moveDirection

                momentum.addForce(settings.acceleration * moveDirection, 0)
            }
        }

        else {
            //friction now comes from the current environment
            let friction = onGround ? collider.surfaceFriction : SceneManager.currentScene.airFriction
            momentum.applyFriction(friction)
        }

        //old gravity
        //momentum.applyGravity(SceneManager.currentScene.gravity)

        //momentum.move()

        //old hardcoded ground collision
        //now handled by CollisionManager and GroundGameObject
        
        // if (this.transform.position.y >= this.groundY) {
        //     this.transform.position.y = this.groundY
        //     momentum.velocityY = 0
        // }
        
    }
}