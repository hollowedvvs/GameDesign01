class ProjectileController extends Component {
    direction = new Vector2(0,0)
    speed = 7
    damage = 1
    targetTag = null

    maxDistance = null
    distanceTraveled = 0
    destroyOffscreen = false
    pointsOnHit = 0

    update() {
        this.moveProjectile()

        if (this.checkMaxDistance()) return
        if (this.destroyOffscreen && this.checkScreenBounds()) return
        if (this.targetTag) this.checkTargets()
    }

    moveProjectile() {
        this.transform.position.x += this.direction.x * this.speed
        this.transform.position.y += this.direction.y * this.speed
    }

    checkMaxDistance() {
        if (this.maxDistance == null) return false

        this.distanceTraveled += this.speed
        if (this.distanceTraveled < this.maxDistance) return false

        this.gameObject.destroy()
        return true
    }

    checkScreenBounds() {
        let cameraPosition = Camera.main.transform.position
        let left = cameraPosition.x - Engine.canvas.width / 2 - 10
        let right = cameraPosition.x + Engine.canvas.width / 2 + 10
        let top = cameraPosition.y - Engine.canvas.height / 2 - 10
        let bottom = cameraPosition.y + Engine.canvas.height / 2 + 10

        if (this.transform.position.x < left || this.transform.position.x > right ||
            this.transform.position.y < top || this.transform.position.y > bottom) {
            this.gameObject.destroy()
            return true
        }

        return false
    }

    checkTargets() {
        let targets = GameObject.findGameObjectsWithTag(this.targetTag)
        let projectilePosition = TransformHelpers.getWorldPosition(this.transform)

        for (const target of targets) {
            if (target.markForDestroy) continue

            let hitbox = target.getComponent(PolygonHitbox)
            if (!hitbox) continue

            if (hitbox.containsPoint(projectilePosition)) {
                this.hitTarget(target)
                return
            }
        }
    }

    hitTarget(target) {
        let health = target.getComponent(Health)

        if (health) {
            health.health -= this.damage

            if (this.pointsOnHit > 0) this.updatePoints(this.pointsOnHit)
            if (health.health <= 0) target.destroy()
        }

        this.gameObject.destroy()
    }

    updatePoints(points) {
        let pointObjects = GameObject.findGameObjectsWithTag("Points")
        if (pointObjects.length == 0) return

        pointObjects[0].broadcastMessage("updatePoints", [points])
    }
}