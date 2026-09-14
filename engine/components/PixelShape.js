class PixelShape extends Component {
    fillStyle = "magenta"
    points = []
    scale = 1
    pixelSize = 4

    draw(ctx) {
        let position = this.transform.position

        ctx.save()
        ctx.translate(position.x, position.y)

        ctx.scale(
            this.gameObject.flipX ? -this.scale : this.scale,
            this.scale
        )

        ctx.fillStyle = this.fillStyle

        for (const point of this.points) {
            ctx.fillRect(
                point.x * this.pixelSize,
                point.y * this.pixelSize,
                this.pixelSize,
                this.pixelSize
            )
        }

        ctx.restore()
    }
}