class TextLabel extends Component {
    fillStyle = "black"
    text = "[BLANK]"
    font = "20px Arial" //sizepx font

    draw(ctx) {
        //old transform system
        //gameobject.draw() now handles position, scale, and rotation
        //let position = this.transform.position

        ctx.save()

        //old transform system
        //ctx.translate(position.x, position.y)
        //ctx.scale(this.transform.scale.x, this.transform.scale.y)
        //ctx.rotate(this.transform.rotation)

        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"

        ctx.fillText(this.text, 0, 0)

        //html ctx measuretext

        ctx.restore()
    }
}
