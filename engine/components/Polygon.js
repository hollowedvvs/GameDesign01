class Polygon extends Component {

    fillStyle = "magenta"
    points = []
    rotation = 0

    draw(ctx) {

        let position = this.transform.position

        // going to draw something
        ctx.save()

        //centering laser
        ctx.translate(position.x, position.y)

        //to rotate
        ctx.rotate(this.rotation)

        ctx.beginPath()

        if (this.points.length > 0) {
            ctx.moveTo(this.points[0].x, this.points[0].y)

            for (let i = 1; i < this.points.length; i++) {
                let point = this.points[i]
                ctx.lineTo(point.x, point.y)
            }

            ctx.closePath()
        }

        // ship
        // ctx.lineTo(0, -20)
        // ctx.lineTo(10, -30)
        // ctx.lineTo(10, 0)
        // ctx.lineTo(50, -40)
        // ctx.lineTo(60, -50)
        // ctx.lineTo(55, 0)
        // ctx.lineTo(0, 40)

        ctx.fillStyle = this.fillStyle
        ctx.fill()

        ctx.restore()
    }
}