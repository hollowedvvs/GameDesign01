class UpdateComponent extends Component {
    facing = 1

    //horizontal movement
    acceleration = 0.45
    reverseAcceleration = 0.70
    airAcceleration = 0.20
    maxMoveSpeed = 4

    //old friction settings
    //friction now comes from the ground surface or scene
    /*
    groundFriction = 0.35
    airFriction = 0.03
    */

    //dash
    dashStrength = 10
    dashCooldown = 600
    dashDelay = 120

    timeSinceLastDash = 600
    dashQueued = false
    dashDelayTimer = 0
    dashDirection = 1

    //old player gravity
    //gravity now comes from the scene and PhysicsGameObject
    //gravity = 0.8

    //old hardcoded ground
    //ground collision is now handled by Collider
    /*
    groundY = 470
    playerBottom = 0
    */

    //jumping
    jumpStrength = -15
    jumpsRemaining = 2

    //old pea power
    //now handled by PlayerPowerController
    /*
    timeSinceLastLaser = 0
    laserCooldown = 300
    */

    //old fire power
    //now handled by PlayerPowerController
    /*
    fireFuel = 100
    maxFireFuel = 100

    fireDrainPerSecond = 25
    fireRegenPerSecond = 15
    fireRegenDelay = 1000

    timeSinceFireReleased = 0
    timeSinceLastFire = 0
    fireRate = 100
    */

    start() {
        //old power timers
        //now handled by PlayerPowerController
        /*
        this.timeSinceLastLaser = 0
        this.timeSinceLastFire = 0
        */
    }

    //called by collision when player lands on ground
    onGrounded() {
        this.jumpsRemaining = 2
    }

    //old attack direction
    //now handled by PlayerPowerController
    /*
    getAttackDirection() {
        let direction = new Vector2(this.facing, 0)

        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) {
            direction = new Vector2(0, -1)
        }

        else if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            direction = new Vector2(0, 1)
        }

        return direction
    }
    */

    update() {
        this.timeSinceLastDash += Engine.fixedDelta

        let momentum = this.gameObject.getComponent(Momentum)
        let collider = this.gameObject.getComponent(Collider)
        let onGround = collider ? collider.grounded : false

        //movement uses held inputs
        let moveRight = Input.getKey("ArrowRight") || Input.getKey("KeyD")
        let moveLeft = Input.getKey("ArrowLeft") || Input.getKey("KeyA")

        let moveDirection = 0

        if (moveRight) {
            moveDirection += 1
        }

        if (moveLeft) {
            moveDirection -= 1
        }

        //horizontal movement
        if (moveDirection !== 0) {
            this.facing = moveDirection
            this.gameObject.flipX = this.facing < 0

            let currentAcceleration = onGround ? this.acceleration : this.airAcceleration

            //stronger braking when changing direction
            if (momentum.velocityX !== 0 && Math.sign(momentum.velocityX) !== moveDirection) {
                currentAcceleration = this.reverseAcceleration
            }

            //normal running acceleration
            if (Math.abs(momentum.velocityX) < this.maxMoveSpeed || Math.sign(momentum.velocityX) !== moveDirection) {
                //old direct momentum change
                //momentum.velocityX += currentAcceleration * moveDirection

                momentum.addForce(currentAcceleration * moveDirection, 0)
            }
        }

        else {
            //friction comes from the current environment
            let friction = onGround ? collider.surfaceFriction : SceneManager.currentScene.airFriction
            momentum.applyFriction(friction)
        }

        //extra momentum from dash or knockback
        if (Math.abs(momentum.velocityX) > this.maxMoveSpeed) {
            let friction = onGround ? collider.surfaceFriction : SceneManager.currentScene.airFriction
            momentum.applyFriction(friction)
        }

        //dash only triggers once per key press
        let dashDown = Input.getKeyDown("ShiftLeft") || Input.getKeyDown("ShiftRight")

        if (dashDown && !this.dashQueued && this.timeSinceLastDash >= this.dashCooldown) {
            this.dashQueued = true
            this.dashDelayTimer = 0
            this.dashDirection = this.facing
        }

        //dash delay
        if (this.dashQueued) {
            this.dashDelayTimer += Engine.fixedDelta

            if (this.dashDelayTimer >= this.dashDelay) {
                momentum.addForce(this.dashDirection * this.dashStrength, 0)

                this.timeSinceLastDash = 0
                this.dashQueued = false
                this.dashDelayTimer = 0
            }
        }

        //jump only triggers once per key press
        let jumpDown = Input.getKeyDown("ArrowUp") || Input.getKeyDown("KeyW")

        if (jumpDown && this.jumpsRemaining > 0) {
            momentum.velocityY = this.jumpStrength
            this.jumpsRemaining -= 1

            if (collider) {
                collider.grounded = false
            }
        }

        //down / fast fall stays held input
        if (Input.getKey("ArrowDown") || Input.getKey("KeyS")) {
            if (momentum.velocityY > 0) {
                momentum.addForce(0, 1.5)
            }
        }

        //old player gravity
        //now handled by PhysicsGameObject
        //momentum.applyGravity(this.gravity)

        //old player movement
        //PhysicsGameObject now applies stored momentum
        //momentum.move()

        //top of level collision
        if (this.transform.position.y < 0) {
            this.transform.position.y = 0
            momentum.velocityY = 0
        }

        //old hardcoded ground collision
        //now handled by CollisionManager and GroundGameObject
        /*
        if (this.transform.position.y + this.playerBottom >= this.groundY) {
            this.transform.position.y = this.groundY - this.playerBottom
            momentum.velocityY = 0
            this.jumpsRemaining = 2
        }
        */

        //old pea firing
        //now handled by PlayerPowerController
        /*
        if (Input.keysDown.includes("Space") && this.timeSinceLastLaser >= this.laserCooldown) {
            this.timeSinceLastLaser = 0

            let direction = this.getAttackDirection()
            instantiate(new LaserGameObject(direction), this.gameObject.transform.position.clone())
        }
        */

        //old fire power
        //now handled by PlayerPowerController
        /*
        let fireDown = Input.keysDown.includes("KeyF")
        let seconds = Engine.fixedDelta / 1000

        if (fireDown) {
            this.timeSinceFireReleased = 0

            if (this.fireFuel > 0) {
                this.fireFuel -= this.fireDrainPerSecond * seconds

                if (this.fireFuel < 0) {
                    this.fireFuel = 0
                }

                if (this.timeSinceLastFire >= this.fireRate) {
                    this.timeSinceLastFire = 0

                    let direction = this.getAttackDirection()
                    instantiate(new FireGameObject(direction), this.gameObject.transform.position.clone())
                }
            }
        }

        else {
            this.timeSinceFireReleased += Engine.fixedDelta

            if (this.timeSinceFireReleased >= this.fireRegenDelay) {
                this.fireFuel += this.fireRegenPerSecond * seconds

                if (this.fireFuel > this.maxFireFuel) {
                    this.fireFuel = this.maxFireFuel
                }
            }
        }
        */

        //camera follows player horizontally
        Camera.main.transform.position.x = this.transform.position.x

        //keep ground near bottom of screen
        let cameraGroundY = 270

        //camera follows upward but stops moving down at ground
        Camera.main.transform.position.y = Math.min(this.transform.position.y, cameraGroundY)
    }
}