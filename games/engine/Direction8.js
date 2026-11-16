//snaps aim vectors to eight directions
class Direction8 {
    static snap(direction) {
        let angle = Math.atan2(direction.y, direction.x)
        let snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)

        return new Vector2(Math.cos(snappedAngle), Math.sin(snappedAngle))
    }
}