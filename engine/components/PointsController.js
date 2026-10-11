class PointsController extends Component {
    start() {
        //sets starting score text
        this.updateText()
    }

    updatePoints(delta) {
        //points are stored globally
        Globals.points += delta

        //updates score display when points change
        this.updateText()
    }

    updateText() {
        let textLabel = this.gameObject.getComponent(TextLabel)

        if (!textLabel) {
            return
        }

        textLabel.text = Globals.points + " points"
    }

    //old score display system
    //updated the text every single frame
    /*
    update() {
        this.gameObject.getComponent(TextLabel).text = Globals.points + " points"
    }
    */
}
