//custom game code
//combines convex shapes into one combat hitbox
class PolygonHitbox extends Polygon {
    shapes = []

    //hitboxes stay invisible
    draw(ctx) {
    }

    addShape(points) {
        this.shapes.push(points)
    }

    containsPoint(point) {
        //checks main shape
        if (this.points.length >= 3 && this.checkShape(point, this.points)) {
            return true
        }

        //checks extra convex shapes
        for (const shape of this.shapes) {
            if (shape.length >= 3 && this.checkShape(point, shape)) {
                return true
            }
        }

        return false
    }

    checkShape(point, points) {
        //lets the class collision code check one specific shape
        let polygon = { points: points }

        let hitboxObject = {
            transform: this.transform,
            getComponent: component => component == Collider ? polygon : null
        }

        return Collisions.isCollisionPointPolygon(point, hitboxObject)
    }
}