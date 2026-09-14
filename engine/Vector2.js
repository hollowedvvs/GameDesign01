class Vector2{
    x
    y
    //__init__
    constructor(x, y){
        //self.x
        this.x = x
        this.y = y
    }
    clone(){
        return new Vector2(this.x, this.y)
    }
}