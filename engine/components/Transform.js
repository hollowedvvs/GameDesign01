class Transform extends Component {
    /** @type {Vector2} */
    //position of the transform
    position = new Vector2(0, 0)


    /** @type {Vector2} */
    //scale of the transform
    scale = new Vector2(1, 1)


    /** @type {Number} */
    //rotation in radians
    rotation = 0

    parent

    //assigns a parent transform so this object follows its parents transformations
    setParent(parentTransform) {
        this.parent = parentTransform
    }

    //builds the matrix for only this transform
    getLocalMatrix() {
        let matrix = new DOMMatrix()
        matrix.translateSelf(this.position.x, this.position.y)
        matrix.rotateSelf(this.rotation * 180 / Math.PI)
        matrix.scaleSelf(this.scale.x, this.scale.y)
        return matrix
    }

    //combines this transform with every parent transform above it
    getWorldMatrix() {
        if (!this.parent) {
            return this.getLocalMatrix()
        }

        return this.parent.getWorldMatrix().multiply(this.getLocalMatrix())
    }
}
