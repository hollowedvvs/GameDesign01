class Vector2 {
    //x part of the vector
    /** @type {Number} */
    x
    //y part of the vector
    /** @type {Number} */
    y



    //constructor is similar to __init__ in python
    /**
    * @param {Number} x
    * @param {Number} y
    */
    constructor(x, y) {
        //this is similar to self in python
        //incoming values are saved to this instance
        this.x = x
        this.y = y
    }

    //adds another vector without changing this one
    /**
    * @param {Vector2} other
     * @returns {Vector2}
    */
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
    /** @returns {Vector2} */
    clone() {
        return new Vector2(this.x, this.y)
    }



    //calculates how closely two vectors point in the same direction
    //positive means same direction, negative means opposite, zero means perpendicular
    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    //returns a new vector rotated 90 degrees clockwise
    //used to find perpendicular axes for collision detection
    orthogonal() {
        return new Vector2(this.y, -this.x)
    }

    //keeps the same direction but changes the vectors length to 1
    //divides x and y by the original magnitude
    normalized() {
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude)
    }

    //multiplies both coordinates by a given number
    //used to adjust movement speed, force, and collision separation
    scaled(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    //adds another vectors coordinates directly to this one
    //changes the original vector instead of creating a new one
    //c++ already has this form of function
    plusEquals(other) {
        //wrong return new Vector2(this.x+other.x, this.y+other.y)
        this.x += other.x
        this.y += other.y
    }
}
