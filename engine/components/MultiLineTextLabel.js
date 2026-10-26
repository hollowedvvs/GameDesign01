class MultiLineTextLabel extends Component {
    //text color
    fillStyle = "black"

    //text being displayed
    text = "[BLANK]"

    font = "10px Arial"

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
        let fontHeight = ctx.measureText("").fontBoundingBoxAscent + ctx.measureText("").fontBoundingBoxDescent
        let y = 0
        let safeLine = ""
        let possibleLine = ""
        for(let word of this.text.split(" "))
        {
            possibleLine = safeLine + word + " "
            if(ctx.measureText(possibleLine).width > this.maxWidth){
                ctx.fillText(safeLine, 0, y)
                y += fontHeight
                safeLine = word + " "
            }
            else{
                safeLine = possibleLine
            }
        }
        ctx.fillText(safeLine, 0, y)

       // ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
