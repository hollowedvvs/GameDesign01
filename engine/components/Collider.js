class Collider extends Component {
    get points() {
        let polygon = this.gameObject.getComponent(Polygon)
        return polygon?.points || []
    }
}