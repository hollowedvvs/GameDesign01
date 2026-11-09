class Polygon extends Component {
    /** @type {String} */
    //polygon fill color
    fillStyle = "magenta"

    /** @type {Vector2[]} */
    //points making up the polygon
    points = []

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        //engine already handles canvas size and clearing
        ctx.save()

        //old transform drawing
        //gameobject now handles the transform before components draw
        //ctx.translate(this.transform.position.x, this.transform.position.y)
        //ctx.rotate(this.transform.rotation)
        //ctx.scale(this.transform.scale.x, this.transform.scale.y)

        //moves through each corner of the polygon
        ctx.beginPath()

        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }

        ctx.fillStyle = this.fillStyle
        ctx.fill()
        ctx.restore()
    }
}
