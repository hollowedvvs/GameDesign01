class UpdateComponent extends Component {
    facing = 1

    // gravity
    velocityY = 0
    gravity = 0.8

    // ground
    groundY = 480
    playerBottom = 56

    //jumping
    jumpStrength = -12
    jumpsRemaining = 2
    jumpWasDown = false

    start() {
        this.timeSinceLastLaser = 0
    }

    update() {
        this.timeSinceLastLaser += 5

        // move right
        if (
            Input.keysDown.includes("ArrowRight") ||
            Input.keysDown.includes("KeyD")
        ) {
            this.transform.position.x += 3
            this.facing = 1
            this.gameObject.flipX = false
        }

        // move left
        if (
            Input.keysDown.includes("ArrowLeft") ||
            Input.keysDown.includes("KeyA")
        ) {
            this.transform.position.x -= 3
            this.facing = -1
            this.gameObject.flipX = true
        }

        // up/jump
        let jumpDown =
            Input.keysDown.includes("ArrowUp") ||
            Input.keysDown.includes("KeyW")

        if (
            jumpDown &&
            !this.jumpWasDown &&
            this.jumpsRemaining > 0
        ) {
            this.velocityY = this.jumpStrength
            this.jumpsRemaining -= 1
        }

        this.jumpWasDown = jumpDown

        // down / fast fall
        if (
            Input.keysDown.includes("ArrowDown") ||
            Input.keysDown.includes("KeyS")
        ) {
            if (this.velocityY > 0) {
                this.velocityY += 0.8
            }
        }

        // gravity
        this.velocityY += this.gravity
        this.transform.position.y += this.velocityY

        // ground collision
        if (
            this.transform.position.y + this.playerBottom >= this.groundY
        ) {
            this.transform.position.y =
                this.groundY - this.playerBottom

            this.velocityY = 0
            this.jumpsRemaining = 2
        }

        // old firing
        // if(this.timeSinceLastLaser > 300){
        //     this.timeSinceLastLaser = 0
        //     instantiate(
        //         new LaserGameObject(),
        //         this.gameObject.transform.position.clone()
        //     )
        // }

        // firing
        if (
            Input.keysDown.includes("Space") &&
            this.timeSinceLastLaser > 100
        ) {
            this.timeSinceLastLaser = 0

            let direction = new Vector2(this.facing, 0)

            // fire up
            if (
                Input.keysDown.includes("ArrowUp") ||
                Input.keysDown.includes("KeyW")
            ) {
                direction = new Vector2(0, -1)
            }

            // fire down
            else if (
                Input.keysDown.includes("ArrowDown") ||
                Input.keysDown.includes("KeyS")
            ) {
                direction = new Vector2(0, 1)
            }

            instantiate(
                new LaserGameObject(direction),
                this.gameObject.transform.position.clone()
            )
        }
    }
}