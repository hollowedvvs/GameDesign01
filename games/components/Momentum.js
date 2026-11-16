
class Momentum extends RigidBody {
    //keeps frame-based movement using rigidbody velocity
    get velocityX() { return this.velocity.x * Time.deltaTime }
    set velocityX(value) { this.velocity.x = value / Time.deltaTime }
    get velocityY() { return this.velocity.y * Time.deltaTime }
    set velocityY(value) { this.velocity.y = value / Time.deltaTime }

    fixedUpdate() {
        let delta = Time.deltaTime
        this.gravity = SceneManager.currentScene.gravity * this.gameObject.gravityScale / (delta * delta)

        let collider = this.gameObject.getComponent(GameCollider)
        let previousBottom = collider?.bottom
        super.fixedUpdate()

        if (!collider || collider.isStatic || collider.isTrigger || this.velocity.y <= 0) return

        for (const gameObject of SceneManager.currentScene.gameObjects) {
            if (gameObject === this.gameObject || gameObject.markForDestroy || !gameObject.tags.includes("Ground")) continue
            let ground = gameObject.getComponent(GameCollider)
            if (!ground || !ground.isStatic || ground.isTrigger) continue
            if (previousBottom > ground.top + 0.01 || collider.bottom < ground.top) continue
            if (collider.right <= ground.left || collider.left >= ground.right) continue

            //leave a small overlap for the existing landing callback
            this.transform.position.y -= collider.bottom - ground.top - 0.01
            break
        }
    }

    update() {
        //prevent another rigidbody from pushing inside static solids
        let collider = this.gameObject.getComponent(GameCollider)
        if (!collider || collider.isStatic || collider.isTrigger) return

        for (const gameObject of SceneManager.currentScene.gameObjects) {
            if (gameObject === this.gameObject || gameObject.markForDestroy) continue
            let solid = gameObject.getComponent(GameCollider)
            if (!solid || !solid.isStatic || solid.isTrigger) continue
            if (collider.right <= solid.left || collider.left >= solid.right ||
                collider.bottom <= solid.top || collider.top >= solid.bottom) continue

            //resolve overlap using the shortest separation
            let left = collider.right - solid.left
            let right = solid.right - collider.left
            let top = collider.bottom - solid.top
            let bottom = solid.bottom - collider.top
            let closest = Math.min(left, right, top, bottom)

            if (closest === top) {
                this.transform.position.y -= top
                if (this.velocityY > 0) this.velocityY = 0
                if (gameObject.tags.includes("Ground")) {
                    collider.grounded = true
                    collider.surfaceFriction = solid.surfaceFriction
                    this.gameObject.broadcastMessage("onGrounded")
                }
            }
            else if (closest === bottom) {
                this.transform.position.y += bottom
                if (this.velocityY < 0) this.velocityY = 0
            }
            else if (closest === left) {
                this.transform.position.x -= left
                if (this.velocityX > 0) this.velocityX = 0
            }
            else {
                this.transform.position.x += right
                if (this.velocityX < 0) this.velocityX = 0
            }
        }
    }

    addForce(x, y) {
        this.velocityX += x
        this.velocityY += y
    }

    applyGravity(gravity) {
        this.velocityY += gravity
    }

    applyFriction(friction) {
        if (this.velocityX > 0) {
            this.velocityX -= friction
            if (this.velocityX < 0) this.velocityX = 0
        }
        else if (this.velocityX < 0) {
            this.velocityX += friction
            if (this.velocityX > 0) this.velocityX = 0
        }
    }
}
