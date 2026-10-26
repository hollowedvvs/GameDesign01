//custom game code
//gets the final world position of parented transforms without changing the class Transform
class TransformHelpers {
    static getWorldPosition(transform) {
        let matrix = transform.getWorldMatrix()
        let point = new DOMPoint(0, 0).matrixTransform(matrix)
        return new Vector2(point.x, point.y)
    }
}
