class ProjectileController extends Component {
    //direction projectile moves
    direction = new Vector2(0, 0)

    //basic projectile settings
    speed = 7
    damage = 1

    //what this projectile can hit
    targetTag = null
    hitDistance = 15

    //optional range limit
    maxDistance = null
    distanceTraveled = 0

    //optional screen limit
    destroyOffscreen = false

    //points given when hitting something
    pointsOnHit = 0

    update() {
        this.moveProjectile()

        //checks range if projectile has one
        if (this.checkMaxDistance()) {
            return
        }

        //checks screen bounds if projectile uses them
        if (this.destroyOffscreen && this.checkScreenBounds()) {
            return
        }

        //only checks collision if projectile has a target
        if (this.targetTag) {
            this.checkTargets()
        }
    }

    moveProjectile() {
        this.transform.position.x += this.direction.x * this.speed

        this.transform.position.y += this.direction.y * this.speed
    }

    checkMaxDistance() {
        //projectile has no range limit
        if (this.maxDistance == null) {
            return false
        }

        this.distanceTraveled += this.speed

        if (this.distanceTraveled >= this.maxDistance) {
            this.gameObject.destroy()
            return true
        }

        return false
    }

    checkScreenBounds() {
        let cameraPosition = Camera.main.transform.position

        let left = cameraPosition.x - Engine.canvas.width / 2 - 10

        let right = cameraPosition.x + Engine.canvas.width / 2 + 10

        let top = cameraPosition.y - Engine.canvas.height / 2 - 10

        let bottom = cameraPosition.y + Engine.canvas.height / 2 + 10

        if (this.transform.position.x < left || this.transform.position.x > right || this.transform.position.y < top || this.transform.position.y > bottom) {
            this.gameObject.destroy()
            return true
        }

        return false
    }

    checkTargets() {
        let targets = GameObject.findGameObjectsWithTag(this.targetTag)

        for (const target of targets) {
            if (target.markForDestroy) {
                continue
            }

            let distance = this.transform.position.minus(target.transform.position).magnitude

            if (distance < this.hitDistance) {
                this.hitTarget(target)

                return
            }
        }
    }

    hitTarget(target) {
        let health = target.getComponent(Health)

        if (health) {
            health.health -= this.damage

            if (this.pointsOnHit > 0) {
                this.updatePoints(this.pointsOnHit)
            }

            if (health.health <= 0) {
                target.destroy()
            }
        }

        this.gameObject.destroy()
    }

    updatePoints(points) {
        //old scoring system
        //every points object received the message
        //because points are global this could multiply one hit
        /*
        let pointObjects = GameObject.findGameObjectsWithTag("Points")

        for (const pointObject of pointObjects) {
            pointObject.broadcastMessage("updatePoints", [points])
        }
        */

        //finds the one points object
        let pointObjects = GameObject.findGameObjectsWithTag("Points")

        if (pointObjects.length == 0) {
            return
        }

        //only one controller is allowed to change global points
        pointObjects[0].broadcastMessage("updatePoints", [points])
    }
}
