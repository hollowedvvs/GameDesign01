class Vector2{
    x
    y
    //__init__
    constructor(x, y){
        //self.x
        this.x = x
        this.y = y
    }

    plus(other){
        return new Vector2(this.x + other.x, this.y + other.y)
    }
    minus(other){
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    get magnitude(){
        return Math.sqrt(this.x**2+this.y**2)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }
}
