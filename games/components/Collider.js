
 //old standalone collider
//class Collider extends Component {
class GameCollider extends Collider {
    width = 20
    height = 20

    offsetX = 0
    offsetY = 0

    isStatic = false
    grounded = false
    surfaceFriction = 0

    //class collider already owns these
    //isTrigger = false
    //_points

    //keep our rectangular hitboxes as class polygon points
    get points() {
        return this._points ?? [
            new Vector2(this.offsetX - this.width / 2, this.offsetY - this.height / 2),
            new Vector2(this.offsetX + this.width / 2, this.offsetY - this.height / 2),
            new Vector2(this.offsetX + this.width / 2, this.offsetY + this.height / 2),
            new Vector2(this.offsetX - this.width / 2, this.offsetY + this.height / 2)
        ]
    }

    set points(points) {
        this._points = points
    }

    get left() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.x + this.offsetX - this.width / 2
    }

    get right() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.x + this.offsetX + this.width / 2
    }

    get top() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.y + this.offsetY - this.height / 2
    }

    get bottom() {
        let position = TransformHelpers.getWorldPosition(this.transform)
        return position.y + this.offsetY + this.height / 2
    }

    fixedUpdate() {
        //old CollisionManager.update reset grounding for every collider
        if (this.isStatic) return
        this.grounded = false
        this.surfaceFriction = 0
    }

    onCollisionStay(other, minimumTransformVector) {
        //old ground-only check let the player accelerate through enemies
        //if (this.isStatic || this.isTrigger || !other.tags.includes("Ground") || minimumTransformVector.y >= 0) return
        if (this.isStatic || this.isTrigger || minimumTransformVector.y >= 0) return

        let solid = other.getComponent(GameCollider)
        if (!solid || solid.isTrigger || this.top >= solid.top) return

        let momentum = this.gameObject.getComponent(Momentum)
        if (!momentum || momentum.velocityY < 0) return

        //stop gravity from building up while standing on any solid object
        momentum.velocityY = 0
        this.grounded = true
        this.surfaceFriction = solid.isStatic ? solid.surfaceFriction : 0.35
        this.gameObject.broadcastMessage("onGrounded")
    }
}
