class Vector2 {
    //x part of the vector
    x

    //y part of the vector
    y

    //constructor is similar to __init__ in python
    constructor(x, y) {
        //this is similar to self in python
        //incoming values are saved to this instance
        this.x = x
        this.y = y
    }

    //adds another vector without changing this one
    plus(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    //subtracts another vector without changing this one
    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    //gets the length of the vector
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    //makes a new vector with the same values
    clone() {
        return new Vector2(this.x, this.y)
    }



    dot(other){
        return this.x * other.x + this.y * other.y
    }

    orthogonal(){
        return new Vector2(this.y, -this.x)
    }
}
