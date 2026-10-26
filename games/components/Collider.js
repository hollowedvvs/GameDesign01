//custom game code
//stores hitboxes and resolves physical objects landing on ground surfaces
class Collider extends Component {
    width = 20
    height = 20

    offsetX = 0
    offsetY = 0

    isStatic = false
    grounded = false
    surfaceFriction = 0

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
}

//custom game code
//checks custom colliders after movement and resolves ground contact
class CollisionManager {
    static update() {
        let gameObjects = SceneManager.currentScene.gameObjects
        let colliders = []

        for (const gameObject of gameObjects) {
            let collider = gameObject.getComponent(Collider)

            if (collider && !gameObject.markForDestroy) {
                colliders.push(collider)
            }
        }

        //reset ground information before checking this frame
        for (const collider of colliders) {
            if (!collider.isStatic) {
                collider.grounded = false
                collider.surfaceFriction = 0
            }
        }

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
    }

    static isColliding(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    static resolveGround(objectCollider, groundCollider) {
        let momentum = objectCollider.gameObject.getComponent(Momentum)

        if (!momentum || momentum.velocityY < 0) {
            return
        }

        //checks where the bottom was before this movement
        let previousBottom = objectCollider.bottom - momentum.velocityY

        if (previousBottom > groundCollider.top) {
            return
        }

        //puts the bottom of the object directly on top of the ground
        objectCollider.transform.position.y = groundCollider.top - objectCollider.offsetY - objectCollider.height / 2

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
