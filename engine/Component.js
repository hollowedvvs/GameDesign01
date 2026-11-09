class Component {
    //gameobject this component belongs to
    /** @type {GameObject} */
    gameObject

    didStart = false

    //gets the parent gameobjects transform
    /**
     * @returns {Transform} The parent game object's transform
     */
    get transform() {
        return this.gameObject.transform
    }
}
