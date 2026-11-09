
class TextLabel extends Component {
    //text color
    /** @type {string} */
    fillStyle = "black"

    //text being displayed
    /** @type {string} */
    text = "[BLANK]"

    //game text size and font
    font = "20px Arial"

    //text alignment settings
    textAlign = "left"
    textBaseline = "middle"

    //draws the text at the gameobjects position
    /** @param {CanvasRenderingContext2D} ctx */
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

        //old hardcoded alignment
        //ctx.textAlign = "left"
        //ctx.textBaseline = "middle"

        //alignment now uses component settings
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline

        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
