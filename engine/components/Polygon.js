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
