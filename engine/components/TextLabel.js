class TextLabel extends Component {
    //text color
    fillStyle = "black"

    //text being displayed
    text = "[BLANK]"

    //game text size
    font = "20px Arial"

    draw(ctx) {
        //engine already handles canvas size and clearing
        ctx.save()

        //old transform drawing
        //gameobject now handles the transform before components draw
        //ctx.translate(this.transform.position.x, this.transform.position.y)
        //ctx.scale(this.transform.scale.x, this.transform.scale.y)
        //ctx.rotate(this.transform.rotation)

        ctx.fillStyle = this.fillStyle
        ctx.font = this.font

        //game text alignment
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"

        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
