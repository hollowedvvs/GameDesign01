class PlayerFireController extends ProjectileController {
    //slower than pea
    speed = 5

    //flame range
    maxDistance = 220

    //small damage per flame
    //full burst = more damage
    damage = 0.5

    //player fire only hits enemies
    targetTag = "Enemy"

    //larger hit range than pea
    hitDistance = 20

    //gives points
    pointsOnHit = 1

    //old player fire controller
    //movement, range, collision, damage, and points are now handled by ProjectileController
    /*
    direction = new Vector2(1, 0)

    //slower than pea
    speed = 5

    //old flamethrower range
    //fire is now used in fixed bursts
    maxDistance = 220
    distanceTraveled = 0

    //small damage per flame
    //full burst does the real damage
    damage = 0.5

    update() {
        //move flame
        this.transform.position.x += this.direction.x * this.speed
        this.transform.position.y += this.direction.y * this.speed

        //track range
        this.distanceTraveled += this.speed

        //burn out after reaching max range
        if (this.distanceTraveled >= this.maxDistance) {
            this.gameObject.destroy()
            return
        }

        //find enemies
        let enemyGameObjects = GameObject.findGameObjectsWithTag("Enemy")

        for (const enemyGameObject of enemyGameObjects) {
            if (enemyGameObject.markForDestroy) {
                continue
            }

            let distance = this.transform.position.minus(enemyGameObject.transform.position).magnitude

            if (distance < 20) {
                let healthComponent = enemyGameObject.getComponent(Health)

                if (healthComponent) {
                    healthComponent.health -= this.damage

                    let gameObjects = GameObject.findGameObjectsByType(Transform)

                    for (const gameObject of gameObjects) {
                        gameObject.broadcastMessage("updatePoints", [1])
                    }

                    if (healthComponent.health <= 0) {
                        enemyGameObject.destroy()
                    }
                }

                this.gameObject.destroy()
                return
            }
        }
    }
    */
}