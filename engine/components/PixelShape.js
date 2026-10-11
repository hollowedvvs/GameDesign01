class PixelShape extends Component {
    fillStyle = "magenta"
    points = []
    scale = 1
    pixelSize = 4
    borders = []

    start() {
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i]

            let right = this.findPixelShapeAt(point.x + 1, point.y)

            if (right) {
                this.borders.push({
                    point: point,
                    direction: "right",
                    pixelShape: right
                })
            }

            let bottom = this.findPixelShapeAt(point.x, point.y + 1)

            if (bottom) {
                this.borders.push({
                    point: point,
                    direction: "bottom",
                    pixelShape: bottom
                })
            }
        }
    }

    findPixelShapeAt(x, y) {
        for (let i = 0; i < this.gameObject.components.length; i++) {
            let component = this.gameObject.components[i]

            if (!(component instanceof PixelShape)) {
                continue
            }

            if (component.pixelSize != this.pixelSize || component.scale != this.scale) {
                continue
            }

            for (let j = 0; j < component.points.length; j++) {
                let point = component.points[j]

                if (point.x == x && point.y == y) {
                    return component
                }
            }
        }

        return null
    }

    draw(ctx) {
        let position = this.transform.position

        ctx.save()

        ctx.translate(position.x, position.y)

        ctx.scale(this.gameObject.flipX ? -this.scale : this.scale, this.scale)

        ctx.fillStyle = this.fillStyle

        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i]

            ctx.fillRect(point.x * this.pixelSize, point.y * this.pixelSize, this.pixelSize, this.pixelSize)
        }

        let borderSize = 1 / this.scale
        let halfBorder = borderSize / 2

        for (let i = 0; i < this.borders.length; i++) {
            let border = this.borders[i]
            let point = border.point

            if (border.direction == "right") {
                let x = (point.x + 1) * this.pixelSize
                let y = point.y * this.pixelSize

                if (border.pixelShape.fillStyle == this.fillStyle) {
                    ctx.fillStyle = this.fillStyle
                    ctx.fillRect(x - halfBorder, y, borderSize, this.pixelSize)
                }
                else {
                    ctx.fillStyle = this.fillStyle
                    ctx.fillRect(x - halfBorder, y, halfBorder, this.pixelSize)

                    ctx.fillStyle = border.pixelShape.fillStyle
                    ctx.fillRect(x, y, halfBorder, this.pixelSize)
                }
            }

            if (border.direction == "bottom") {
                let x = point.x * this.pixelSize
                let y = (point.y + 1) * this.pixelSize

                if (border.pixelShape.fillStyle == this.fillStyle) {
                    ctx.fillStyle = this.fillStyle
                    ctx.fillRect(x, y - halfBorder, this.pixelSize, borderSize)
                }
                else {
                    ctx.fillStyle = this.fillStyle
                    ctx.fillRect(x, y - halfBorder, this.pixelSize, halfBorder)

                    ctx.fillStyle = border.pixelShape.fillStyle
                    ctx.fillRect(x, y, this.pixelSize, halfBorder)
                }
            }
        }

        ctx.restore()
    }
}
