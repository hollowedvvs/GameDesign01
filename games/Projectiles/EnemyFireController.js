class EnemyFireController extends ProjectileController {
    //enemy fire settings
    speed = 5

    //same general reach as player fire
    maxDistance = 220

    damage = 0.5

    //enemy fire only hits player
    targetTag = "Player"

    //slightly larger hit range
    hitDistance = 25

    //old enemy fire controller
    //movement, range, collision, and damage are now handled by ProjectileController
    /*
    direction = new Vector2(1, 0)

    speed = 5

    //same general reach as player fire
    maxDistance = 220
    distanceTraveled = 0

    damage = 0.5

    update() {
        //move flame
        this.transform.position.x += this.direction.x * this.speed

        this.transform.position.y += this.direction.y * this.speed

        this.distanceTraveled += this.speed

        //flame burns out
        if (this.distanceTraveled >= this.maxDistance) {
            this.gameObject.destroy()
            return
        }

        let players = GameObject.findGameObjectsWithTag("Player")

        for (const player of players) {
            if (player.markForDestroy) {
                continue
            }

            let distance = this.transform.position.minus(player.transform.position).magnitude

            if (distance < 25) {
                let health = player.getComponent(Health)

                //player health can be added later
                if (health) {
                    health.health -= this.damage
                }

                this.gameObject.destroy()
                return
            }
        }
    }
    */
}
