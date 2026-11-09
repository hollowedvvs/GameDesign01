class Momentum extends RigidBody {
    //old separate velocity values
    //velocityX = 0
    //velocityY = 0

    //keeps our frame-based movement using rigidbody velocity
    get velocityX() {
        return this.velocity.x * Time.deltaTime
    }

    set velocityX(value) {
        this.velocity.x = value / Time.deltaTime
    }

    get velocityY() {
        return this.velocity.y * Time.deltaTime
    }

    set velocityY(value) {
        this.velocity.y = value / Time.deltaTime
    }

    fixedUpdate() {
        //converts level gravity for the class rigidbody
        let delta = Time.deltaTime
        this.gravity = SceneManager.currentScene.gravity * this.gameObject.gravityScale / (delta * delta)

        //class handles gravity and movement
        super.fixedUpdate()
    }

    addForce(x, y) {
        this.velocityX += x
        this.velocityY += y
    }

    applyGravity(gravity) {
        this.velocityY += gravity
    }

    applyFriction(friction) {
        //slows horizontal momentum toward zero
        if (this.velocityX > 0) {
            this.velocityX -= friction
            if (this.velocityX < 0) this.velocityX = 0
        }
        else if (this.velocityX < 0) {
            this.velocityX += friction
            if (this.velocityX > 0) this.velocityX = 0
        }
    }

    //old manual movement
    //rigidbody now handles this through fixedUpdate
    /*
    move() {
        this.transform.position.x += this.velocityX
        this.transform.position.y += this.velocityY
    }
    */
}
