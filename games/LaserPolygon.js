class LaserPolygon extends Component {
    draw(ctx) {
        let position = this.transform.position
        // Going to draw something
        ctx.save()

        // Center
        ctx.translate(position.x, position.y)


        ctx.restore()
    }
}