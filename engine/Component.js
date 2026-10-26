class Component {
    //gameobject this component belongs to
    gameObject

    didStart = false

    //gets the parent gameobjects transform
    get transform() {
        return this.gameObject.transform
    }
}
