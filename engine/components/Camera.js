class Camera extends Component {
    //background color used when clearing the screen
    backgroundColor = "white"

    //gets the camera tagged as the main camera
    static get main() {
        return GameObject.findGameObjectsWithTag("MainCamera")[0].getComponent(Camera)
    }
}