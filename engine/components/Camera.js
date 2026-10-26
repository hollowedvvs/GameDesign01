class Camera extends Component {
    backgroundColor = "white"

    //gets the camera tagged as the main camera
    static get main() {
        return GameObject.findGameObjectsWithTag("MainCamera")[0].getComponent(Camera)
    }
}
