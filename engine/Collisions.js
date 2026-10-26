
class Collisions {
    static isCollisionPointPolygon(point, gameObject) {
        //get collider points
        let points = gameObject.getComponent(Collider)?.points
        if (!Array.isArray(points) || points.length < 3) return false

        //move everything into world space
        let worldSpacePoints = []
        let matrix = gameObject.transform.getWorldMatrix()

        for (const point of points) {
            let worldPoint = matrix.transformPoint(point)
            worldSpacePoints.push(new Vector2(worldPoint.x, worldPoint.y))
        }

        //find the axes for projection
        for (let i = 0; i < worldSpacePoints.length; i++) {
            let point1 = worldSpacePoints[i]
            let point2 = worldSpacePoints[(i + 1) % worldSpacePoints.length]
            let edge = point2.minus(point1)
            let axis = edge.orthogonal()

            //check for overlap
            let pointProjection = point.dot(axis)
            let polygonProjections = worldSpacePoints.map(p => p.dot(axis))

            if (pointProjection < Math.min(...polygonProjections) || pointProjection > Math.max(...polygonProjections)) return false
        }

        return true
    }

    static isCollisionPolygonPolygon(gameObject, gameObjectTwo) {
        //get collider points
        let points = gameObject.getComponent(Collider)?.points
        let pointsTwo = gameObjectTwo.getComponent(Collider)?.points
        if (!Array.isArray(points) || !Array.isArray(pointsTwo) || points.length < 3 || pointsTwo.length < 3) return false

        //move everything into world space
        let worldSpacePoints = []
        let worldSpacePointsTwo = []
        let matrix = gameObject.transform.getWorldMatrix()
        let matrixTwo = gameObjectTwo.transform.getWorldMatrix()

        for (const point of points) {
            let worldPoint = matrix.transformPoint(point)
            worldSpacePoints.push(new Vector2(worldPoint.x, worldPoint.y))
        }

        for (const point of pointsTwo) {
            let worldPoint = matrixTwo.transformPoint(point)
            worldSpacePointsTwo.push(new Vector2(worldPoint.x, worldPoint.y))
        }

        let axes = []

        //find axes from first polygon
        for (let i = 0; i < worldSpacePoints.length; i++) {
            let point1 = worldSpacePoints[i]
            let point2 = worldSpacePoints[(i + 1) % worldSpacePoints.length]
            let edge = point2.minus(point1)
            axes.push(edge.orthogonal())
        }

        //find axes from second polygon
        for (let i = 0; i < worldSpacePointsTwo.length; i++) {
            let point1 = worldSpacePointsTwo[i]
            let point2 = worldSpacePointsTwo[(i + 1) % worldSpacePointsTwo.length]
            let edge = point2.minus(point1)
            axes.push(edge.orthogonal())
        }

        //check for overlap on every axis
        for (const axis of axes) {
            let polygonProjections = worldSpacePoints.map(p => p.dot(axis))
            let polygonProjectionsTwo = worldSpacePointsTwo.map(p => p.dot(axis))

            if (Math.max(...polygonProjectionsTwo) < Math.min(...polygonProjections) || Math.min(...polygonProjectionsTwo) > Math.max(...polygonProjections)) return false
        }

        return true
    }
}
