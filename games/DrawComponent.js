class DrawComponent extends Component {
    draw(ctx) {
        let position = this.gameObject.components[0].position
        // Going to draw something
        ctx.save()

        // Center
        ctx.translate(position.x, position.y)

        // Ship
        ctx.lineTo(0, -20)
        ctx.lineTo(10, -30)
        ctx.lineTo(10, 0)
        ctx.lineTo(50, -40)
        ctx.lineTo(60, -50)
        ctx.lineTo(55, 0)
        ctx.lineTo(0, 40)

        ctx.fillStyle = "black"
        ctx.fill()

        ctx.restore()
    }
}