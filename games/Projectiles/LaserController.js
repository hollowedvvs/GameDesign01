class LaserController extends ProjectileController {
    //laser settings
    speed = 7
    damage = 1
    targetTag = "Enemy"
    hitDistance = 15
    destroyOffscreen = true
    pointsOnHit = 1

    //old laser controller
    //all of this is now handled by ProjectileController
    /*
    //commands direction
    direction = new Vector2(0, -1)

    update() {
        //move laser
        this.transform.position.x += this.direction.x * 7
        this.transform.position.y += this.direction.y * 7

        //camera screen bounds
        let cameraPosition = Camera.main.transform.position

        let left = cameraPosition.x - Engine.canvas.width / 2 - 10

        let right = cameraPosition.x + Engine.canvas.width / 2 + 10

        let top = cameraPosition.y - Engine.canvas.height / 2 - 10

        let bottom = cameraPosition.y + Engine.canvas.height / 2 + 10

        //destroy when off screen
        if (this.transform.position.x < left || this.transform.position.x > right || this.transform.position.y < top || this.transform.position.y > bottom) {
            this.gameObject.destroy()
            return
        }

        //rough collision check
        let myPosition = this.transform.position
        let enemyGameObjects = GameObject.findGameObjectsWithTag("Enemy")

        for (const enemyGameObject of enemyGameObjects) {
            if (enemyGameObject.markForDestroy) continue

            let enemyPosition = enemyGameObject.transform.position

            let distance = myPosition.minus(enemyPosition).magnitude

            if (distance < 15) {
                let healthComponent = enemyGameObject.getComponent(Health)

                if (healthComponent) {
                    healthComponent.health--
                    //Globals.points++
                    let gameObjects = GameObject.findGameObjectsByType(Transform)

                    for (const gameObject of gameObjects) {
                        gameObject.broadcastMessage("updatePoints", [1])
                    }

                    if (healthComponent.health <= 0) {
                        enemyGameObject.destroy()
                    }
                }

                this.gameObject.destroy()
                //enemyGameObject.destroy()
                return
            }
        }
    }
    */
}
