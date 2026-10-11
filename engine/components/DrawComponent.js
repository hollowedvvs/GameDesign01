class DrawComponent extends Component {
    draw(ctx) {

        //old position system
        //gameobject.draw() now handles position through the world matrix
        //let position = this.transform.position

        //going to draw something
        ctx.save()

        //old center system
        //ctx.translate(position.x, position.y)

        ctx.beginPath()
    }
}
