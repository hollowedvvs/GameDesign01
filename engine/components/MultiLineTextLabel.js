class MultiLineTextLabel extends Component {
    //text color
    fillStyle = "black"

    //text being displayed
    text = "[BLANK]"

    //font used when drawing multiple lines
    font = "10px Arial"

    //maximum width before text wraps to another line
    maxWidth = 100

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

        //measures the text if multiline sizing is needed later
        //let measurement = ctx.measureText(this.text)
        //calculates the height of each line for vertical spacing
        let fontHeight = ctx.measureText("").fontBoundingBoxAscent + ctx.measureText("").fontBoundingBoxDescent
        let y = 0
        let safeLine = ""
        let possibleLine = ""

        //checks each word to see if it fits on the current line
        //moves to the next line when the text exceeds maxWidth
        for (let word of this.text.split(" ")) {
            possibleLine = safeLine + word + " "
            if (ctx.measureText(possibleLine).width > this.maxWidth) {
                ctx.fillText(safeLine, 0, y)
                y += fontHeight
                safeLine = word + " "
            }
            else {
                safeLine = possibleLine
            }
        }
        //draws the remaining words after the loop finishes
        ctx.fillText(safeLine, 0, y)

        // ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
