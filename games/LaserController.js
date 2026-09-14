class LaserController extends Component {
    //commands direction
    direction = new Vector2(0, -1)

    //destrou after -10
    update() {
        this.transform.position.x += this.direction.x * 7
        this.transform.position.y += this.direction.y * 7
        if (this.transform.position.y < -10) {
            this.gameObject.destroy()
        }



    }
}