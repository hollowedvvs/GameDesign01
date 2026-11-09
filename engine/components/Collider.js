class Collider extends Component {
    isTrigger = false

    _points
    get points() {
        //old fallback for missing polygon
        //let polygon = this.gameObject.getComponent(Polygon)
        //return this._points ?? polygon?.points ?? []

        return this._points ?? this.gameObject.getComponent(Polygon).points
    }

    set points(points) {
        this._points = points
    }
}