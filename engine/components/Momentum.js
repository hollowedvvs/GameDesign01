class Momentum extends Component {
    velocityX = 0
    velocityY = 0

    addForce(x, y) {
        this.velocityX += x
        this.velocityY += y
    }

    applyGravity(gravity) {
        //adds downward momentum
        this.velocityY += gravity
    }

    applyFriction(friction) {
        //slows horizontal momentum toward zero
        if (this.velocityX > 0) {
            this.velocityX -= friction

            if (this.velocityX < 0) {
                this.velocityX = 0
            }
        }
        else if (this.velocityX < 0) {
            this.velocityX += friction

            if (this.velocityX > 0) {
                this.velocityX = 0
            }
        }
    }

    move() {
        //applies stored momentum to position
        this.transform.position.x += this.velocityX

        this.transform.position.y += this.velocityY
    }
}
