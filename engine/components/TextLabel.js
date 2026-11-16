
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

        ctx.fillStyle = this.fillStyle
        ctx.font = this.font

        //alignment now uses component settings
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline

        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
