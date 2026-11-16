
class UpdateComponent extends Component {
    facing = 1

    //horizontal movement
    acceleration = 0.45
    reverseAcceleration = 0.70
    airAcceleration = 0.20
    maxMoveSpeed = 4

    //dash
    dashStrength = 10
    dashCooldown = 600
    dashDelay = 120
    timeSinceLastDash = 600
    dashQueued = false
    dashDelayTimer = 0
    dashDirection = 1

    //jumping
    jumpStrength = -15
    jumpsRemaining = 2

    //called when player lands on a solid surface
    onGrounded() {
        this.jumpsRemaining = 2
    }

    update() {
        this.timeSinceLastDash += GameTime.fixedDelta

        let momentum = this.gameObject.getComponent(Momentum)
        let collider = this.gameObject.getComponent(Collider)
        let onGround = collider ? collider.grounded : false

        //movement uses held inputs
        let moveRight = Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")
        let moveLeft = Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")
        let moveDirection = 0

        if (moveRight) moveDirection += 1
        if (moveLeft) moveDirection -= 1

        //horizontal movement
        if (moveDirection !== 0) {
            this.facing = moveDirection
            this.gameObject.flipX = this.facing < 0

            let currentAcceleration = onGround ? this.acceleration : this.airAcceleration

            //stronger braking when changing direction
            if (momentum.velocityX !== 0 && Math.sign(momentum.velocityX) !== moveDirection) {
                currentAcceleration = this.reverseAcceleration
            }

            if (Math.abs(momentum.velocityX) < this.maxMoveSpeed || Math.sign(momentum.velocityX) !== moveDirection) {
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
        let dashDown = Input.keysDownThisFrame.includes("ShiftLeft") || Input.keysDownThisFrame.includes("ShiftRight")

        if (dashDown && !this.dashQueued && this.timeSinceLastDash >= this.dashCooldown) {
            this.dashQueued = true
            this.dashDelayTimer = 0
            this.dashDirection = this.facing
        }

        //dash delay
        if (this.dashQueued) {
            this.dashDelayTimer += GameTime.fixedDelta

            if (this.dashDelayTimer >= this.dashDelay) {
                momentum.addForce(this.dashDirection * this.dashStrength, 0)
                this.timeSinceLastDash = 0
                this.dashQueued = false
                this.dashDelayTimer = 0
            }
        }

        //jump only triggers once per key press
        let jumpDown = Input.keysDownThisFrame.includes("ArrowUp") || Input.keysDownThisFrame.includes("KeyW")

        if (jumpDown && this.jumpsRemaining > 0) {
            momentum.velocityY = this.jumpStrength
            this.jumpsRemaining -= 1
        }

        //fast fall
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            if (momentum.velocityY > 0) momentum.addForce(0, 1.5)
        }

        //top of level collision
        if (this.transform.position.y < 0) {
            this.transform.position.y = 0
            momentum.velocityY = 0
        }

        //camera follows player horizontally
        Camera.main.transform.position.x = this.transform.position.x

        //camera follows upward but stops moving down at ground
        let cameraGroundY = 270
        Camera.main.transform.position.y = Math.min(this.transform.position.y, cameraGroundY)
    }
}
