class EnemyLaserController extends ProjectileController {
    //enemy laser settings
    speed = 7
    destroyOffscreen = true

    //old enemy laser controller
    //movement and screen bounds are now handled by ProjectileController
    /*
    direction = new Vector2(0, 1)

    update() {
        this.transform.position.x += this.direction.x * 7
        this.transform.position.y += this.direction.y * 7

        //camera screen bounds
        let cameraPosition = Camera.main.transform.position

        let left = cameraPosition.x - Engine.canvas.width / 2 - 10

        let right = cameraPosition.x + Engine.canvas.width / 2 + 10

        let top = cameraPosition.y - Engine.canvas.height / 2 - 10

        let bottom = cameraPosition.y + Engine.canvas.height / 2 + 10

        if (this.transform.position.x < left || this.transform.position.x > right || this.transform.position.y < top || this.transform.position.y > bottom) {
            this.gameObject.destroy()
            return
        }
    }
    */
}
