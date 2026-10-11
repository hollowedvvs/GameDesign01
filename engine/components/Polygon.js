class Polygon extends Component {
    fillStyle = "magenta"
    points = []

    //extra rotation only for this polygon
    rotation = 0

    draw(ctx) {
        ctx.save()

        //old transform system
        //gameobject.draw() now handles position, scale, and rotation
        //let position = this.transform.position

        //old position
        //ctx.translate(
        //   position.x,
        //   position.y
        //)

        //old gameobject scale
        //ctx.scale(
        //   this.transform.scale.x,
        //   this.transform.scale.y
        //)

        //old gameobject and polygon rotation together
        //ctx.rotate(
        //   this.transform.rotation +
        //   this.rotation
        //)

        //polygon only keeps its own extra rotation
        //gameobject rotation is handled by the transform
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

        //ship
        //ctx.lineTo(0, -20)
        //ctx.lineTo(10, -30)
        //ctx.lineTo(10, 0)
        //ctx.lineTo(50, -40)
        //ctx.lineTo(60, -50)
        //ctx.lineTo(55, 0)
        //ctx.lineTo(0, 40)

        ctx.fillStyle = this.fillStyle

        ctx.fill()

        ctx.restore()
    }
}
