//old standalone collider
//class Collider extends Component {
class GameCollider extends Collider {
    width = 20
    height = 20

    offsetX = 0
    offsetY = 0

    isStatic = false
    grounded = false
    surfaceFriction = 0

    //class collider already owns these
    //isTrigger = false
    //_points

    //keep our rectangular hitboxes as class polygon points
    get points() {
        return this._points ?? [
            new Vector2(this.offsetX - this.width / 2, this.offsetY - this.height / 2),
            new Vector2(this.offsetX + this.width / 2, this.offsetY - this.height / 2),
            new Vector2(this.offsetX + this.width / 2, this.offsetY + this.height / 2),
            new Vector2(this.offsetX - this.width / 2, this.offsetY + this.height / 2)
        ]
    }

    set points(points) {
        this._points = points
    }

    get left() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.x + this.offsetX - this.width / 2
    }

    get right() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.x + this.offsetX + this.width / 2
    }

    get top() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.y + this.offsetY - this.height / 2
    }

    get bottom() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.y + this.offsetY + this.height / 2
    }

    onCollisionStay(other, minimumTransformVector) {
        if (this.isStatic || this.isTrigger || !other.tags.includes("Ground")) return
        let ground = other.getComponent(Collider)
        if (!ground || ground.isTrigger) return
        CollisionManager.resolveGround(this, ground, minimumTransformVector)
    }
}

//class scene resolves collisions, we keep grounding and surface friction
class CollisionManager {
    static update() {
        let gameObjects = SceneManager.currentScene.gameObjects
        let colliders = []

        for (const gameObject of gameObjects) {
            let collider = gameObject.getComponent(Collider)
            if (collider && !gameObject.markForDestroy) colliders.push(collider)
        }

        //reset contacts before scene broadcasts onCollisionStay
        for (const collider of colliders) {
            if (!collider.isStatic) {
                collider.grounded = false
                collider.surfaceFriction = 0
            }
        }

        //old ground overlap loop
        //class scene now detects and separates collisions
        /*
        for (const collider of colliders) {
            if (collider.isStatic) {
                continue
            }

            for (const other of colliders) {
                if (!other.isStatic) {
                    continue
                }

                if (!this.isColliding(collider, other)) {
                    continue
                }

                if (other.gameObject.tags.includes("Ground")) {
                    this.resolveGround(collider, other)
                }
            }
        }
        */
    }

    static isColliding(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    static resolveGround(objectCollider, groundCollider, minimumTransformVector) {
        let momentum = objectCollider.gameObject.getComponent(Momentum)

        //only land while falling onto the top of the ground
        if (!momentum || momentum.velocityY < 0 || minimumTransformVector.y >= 0) return

        //old manual crossing check and position correction
        //class scene already calculated the overlap and separates the objects
        /*
        let previousBottom = objectCollider.bottom - momentum.velocityY
        if (previousBottom > groundCollider.top) return
        objectCollider.transform.position.y = groundCollider.top - objectCollider.offsetY - objectCollider.height / 2
        */

        momentum.velocityY = 0
        objectCollider.grounded = true
        objectCollider.surfaceFriction = groundCollider.surfaceFriction

        //lets controllers know they touched ground
        objectCollider.gameObject.broadcastMessage("onGrounded")
    }

    //old collision system
    //projectiles now handle their own damage and points
    /*
    static update() {
        let gameObjects = GameObject.gameObjects

        for (let i = 0; i < gameObjects.length; i++) {
            let a = gameObjects[i]

            if (a.destroyed) continue

            let colliderA = a.getComponent(Collider)

            if (!colliderA) continue

            for (let j = i + 1; j < gameObjects.length; j++) {
                let b = gameObjects[j]

                if (b.destroyed) continue

                let colliderB = b.getComponent(Collider)

                if (!colliderB) continue

                if (this.isColliding(colliderA, colliderB)) {
                    this.handleCollision(a, colliderA, b, colliderB)
                }
            }
        }
    }

    static isColliding(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    static handleCollision(a, colliderA, b, colliderB) {
        let tagA = colliderA.tag
        let tagB = colliderB.tag

        if ((tagA == "PlayerPea" && tagB == "Enemy") || (tagA == "Enemy" && tagB == "PlayerPea")) {
            let pea = tagA == "PlayerPea" ? a : b
            let enemy = tagA == "Enemy" ? a : b
            let health = enemy.getComponent(Health)

            if (health) {
                health.health--
                Globals.points++
            }

            pea.destroy()
        }

        if ((tagA == "EnemyPea" && tagB == "Player") || (tagA == "Player" && tagB == "EnemyPea")) {
            let pea = tagA == "EnemyPea" ? a : b
            let player = tagA == "Player" ? a : b
            let health = player.getComponent(Health)

            if (health) {
                health.health--
            }

            pea.destroy()
        }
    }
    */
}
