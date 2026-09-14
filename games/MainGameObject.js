class MainGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new UpdateComponent())
        

        // black face / feet layer
        this.addComponent(new PixelShape(), {
            fillStyle: "black",
            pixelSize: 4,
            scale: 1,
            points: [
                new Vector2(-3, -10), new Vector2(-2, -10), new Vector2(-1, -10), new Vector2(0, -10), new Vector2(-4, -9), new Vector2(-3, -9),
                new Vector2(-2, -9), new Vector2(-1, -9), new Vector2(0, -9), new Vector2(1, -9), new Vector2(-4, -8), new Vector2(-3, -8),
                new Vector2(-2, -8), new Vector2(-1, -8), new Vector2(0, -8), new Vector2(1, -8), new Vector2(-4, -7), new Vector2(-2, -7),
                new Vector2(-1, -7), new Vector2(0, -7), new Vector2(-4, -6), new Vector2(-2, -6), new Vector2(-1, -6), new Vector2(0, -6),
                new Vector2(-4, -5), new Vector2(-3, -5), new Vector2(-2, -5), new Vector2(-1, -5), new Vector2(0, -5), new Vector2(1, -5),
                new Vector2(-3, -4), new Vector2(-2, -4), new Vector2(-1, -4), new Vector2(0, -4), new Vector2(1, -4), new Vector2(-2, -3),
                new Vector2(-1, -3), new Vector2(0, -3), new Vector2(-1, 8), new Vector2(-2, 9), new Vector2(-1, 9), new Vector2(-2, 10),
                new Vector2(-1, 10), new Vector2(0, 10), new Vector2(0, 11), new Vector2(-5, 12), new Vector2(-4, 12), new Vector2(1, 12),
                new Vector2(-4, 13), new Vector2(1, 13), new Vector2(-4, 14), new Vector2(1, 14)
            ]
        })

        // darker grey outer body
        this.addComponent(new PixelShape(), {
            fillStyle: "rgb(42, 41, 41)",
            pixelSize: 4,
            scale: 1,
            points: [
                new Vector2(-6, -13), new Vector2(-5, -13), new Vector2(-4, -13), new Vector2(-3, -13), new Vector2(-2, -13), new Vector2(-1, -13),
                new Vector2(0, -13), new Vector2(-7, -12), new Vector2(1, -12), new Vector2(-8, -11), new Vector2(-3, -11), new Vector2(-2, -11),
                new Vector2(-1, -11), new Vector2(0, -11), new Vector2(2, -11), new Vector2(-9, -10), new Vector2(-4, -10), new Vector2(1, -10),
                new Vector2(3, -10), new Vector2(-9, -9), new Vector2(-5, -9), new Vector2(2, -9), new Vector2(4, -9), new Vector2(-10, -8),
                new Vector2(-5, -8), new Vector2(2, -8), new Vector2(4, -8), new Vector2(-10, -7), new Vector2(-5, -7), new Vector2(2, -7),
                new Vector2(4, -7), new Vector2(-10, -6), new Vector2(-8, -6), new Vector2(-5, -6), new Vector2(2, -6), new Vector2(4, -6),
                new Vector2(-10, -5), new Vector2(-8, -5), new Vector2(-5, -5), new Vector2(2, -5), new Vector2(4, -5), new Vector2(-9, -4),
                new Vector2(-8, -4), new Vector2(-4, -4), new Vector2(2, -4), new Vector2(4, -4), new Vector2(-7, -3), new Vector2(-3, -3),
                new Vector2(1, -3), new Vector2(3, -3), new Vector2(-6, -2), new Vector2(-5, -2), new Vector2(-2, -2), new Vector2(-1, -2),
                new Vector2(0, -2), new Vector2(2, -2), new Vector2(-7, -1), new Vector2(3, -1), new Vector2(-8, 0), new Vector2(4, 0),
                new Vector2(-8, 1), new Vector2(4, 1), new Vector2(-8, 2), new Vector2(4, 2), new Vector2(-9, 3), new Vector2(4, 3),
                new Vector2(-9, 4), new Vector2(5, 4), new Vector2(-9, 5), new Vector2(5, 5), new Vector2(-9, 6), new Vector2(-1, 6),
                new Vector2(5, 6), new Vector2(-10, 7), new Vector2(-1, 7), new Vector2(5, 7), new Vector2(-10, 8), new Vector2(-2, 8),
                new Vector2(0, 8), new Vector2(5, 8), new Vector2(-10, 9), new Vector2(-8, 9), new Vector2(-3, 9), new Vector2(0, 9),
                new Vector2(3, 9), new Vector2(5, 9), new Vector2(-9, 10), new Vector2(-8, 10), new Vector2(-6, 10), new Vector2(-3, 10),
                new Vector2(1, 10), new Vector2(4, 10), new Vector2(-8, 11), new Vector2(-7, 11), new Vector2(-5, 11), new Vector2(-4, 11),
                new Vector2(-3, 11), new Vector2(1, 11), new Vector2(2, 11), new Vector2(3, 11)
            ]
        })

        // grey shading
        this.addComponent(new PixelShape(), {
            fillStyle: "rgb(75, 75, 75)",
            pixelSize: 4,
            scale: 1,
            points: [
                new Vector2(-6, -12), new Vector2(-7, -11), new Vector2(-8, -10), new Vector2(-8, -9), new Vector2(-9, -8), new Vector2(-8, -8),
                new Vector2(-9, -7), new Vector2(-8, -7), new Vector2(-7, -7), new Vector2(-9, -6), new Vector2(-7, -6), new Vector2(-9, -5),
                new Vector2(-7, -5), new Vector2(3, -5), new Vector2(-7, -4), new Vector2(-6, -4), new Vector2(3, -4), new Vector2(-6, -3),
                new Vector2(-5, -3), new Vector2(-4, -3), new Vector2(2, -3), new Vector2(-4, -2), new Vector2(-3, -2), new Vector2(1, -2),
                new Vector2(-6, -1), new Vector2(-5, -1), new Vector2(-4, -1), new Vector2(2, -1), new Vector2(-7, 0), new Vector2(3, 0),
                new Vector2(-7, 1), new Vector2(3, 1), new Vector2(-8, 3), new Vector2(-8, 4), new Vector2(-1, 4), new Vector2(4, 4),
                new Vector2(-8, 5), new Vector2(-1, 5), new Vector2(4, 5), new Vector2(-8, 6), new Vector2(-2, 6), new Vector2(0, 6),
                new Vector2(3, 6), new Vector2(4, 6), new Vector2(-9, 7), new Vector2(-8, 7), new Vector2(-7, 7), new Vector2(-5, 7),
                new Vector2(-3, 7), new Vector2(-2, 7), new Vector2(0, 7), new Vector2(1, 7), new Vector2(3, 7), new Vector2(4, 7),
                new Vector2(-9, 8), new Vector2(-8, 8), new Vector2(-7, 8), new Vector2(-6, 8), new Vector2(-4, 8), new Vector2(-3, 8),
                new Vector2(1, 8), new Vector2(2, 8), new Vector2(3, 8), new Vector2(4, 8), new Vector2(-9, 9), new Vector2(-7, 9),
                new Vector2(-6, 9), new Vector2(-5, 9), new Vector2(-4, 9), new Vector2(1, 9), new Vector2(2, 9), new Vector2(4, 9),
                new Vector2(-7, 10), new Vector2(-5, 10), new Vector2(-4, 10), new Vector2(2, 10), new Vector2(3, 10)
            ]
        })

        // light grey main body
        this.addComponent(new PixelShape(), {
            fillStyle: "rgb(117, 117, 117)",
            pixelSize: 4,
            scale: 1,
            points: [
                new Vector2(-5, -12), new Vector2(-4, -12), new Vector2(-3, -12), new Vector2(-2, -12), new Vector2(-1, -12), new Vector2(0, -12),
                new Vector2(-6, -11), new Vector2(-5, -11), new Vector2(-4, -11), new Vector2(1, -11), new Vector2(-7, -10), new Vector2(-6, -10),
                new Vector2(-5, -10), new Vector2(2, -10), new Vector2(-7, -9), new Vector2(-6, -9), new Vector2(3, -9), new Vector2(-7, -8),
                new Vector2(-6, -8), new Vector2(3, -8), new Vector2(-6, -7), new Vector2(3, -7), new Vector2(-6, -6), new Vector2(3, -6),
                new Vector2(-6, -5), new Vector2(-5, -4), new Vector2(-3, -1), new Vector2(-2, -1), new Vector2(-1, -1), new Vector2(0, -1),
                new Vector2(1, -1), new Vector2(-6, 0), new Vector2(-5, 0), new Vector2(-4, 0), new Vector2(-3, 0), new Vector2(-2, 0),
                new Vector2(-1, 0), new Vector2(0, 0), new Vector2(1, 0), new Vector2(2, 0), new Vector2(-6, 1), new Vector2(-5, 1),
                new Vector2(-4, 1), new Vector2(-3, 1), new Vector2(-2, 1), new Vector2(-1, 1), new Vector2(0, 1), new Vector2(1, 1),
                new Vector2(2, 1), new Vector2(-7, 2), new Vector2(-6, 2), new Vector2(-5, 2), new Vector2(-4, 2), new Vector2(-3, 2),
                new Vector2(-2, 2), new Vector2(-1, 2), new Vector2(0, 2), new Vector2(1, 2), new Vector2(2, 2), new Vector2(3, 2),
                new Vector2(-7, 3), new Vector2(-6, 3), new Vector2(-5, 3), new Vector2(-4, 3), new Vector2(-3, 3), new Vector2(-2, 3),
                new Vector2(-1, 3), new Vector2(0, 3), new Vector2(1, 3), new Vector2(2, 3), new Vector2(3, 3), new Vector2(-7, 4),
                new Vector2(-6, 4), new Vector2(-5, 4), new Vector2(-4, 4), new Vector2(-3, 4), new Vector2(-2, 4), new Vector2(0, 4),
                new Vector2(1, 4), new Vector2(2, 4), new Vector2(3, 4), new Vector2(-7, 5), new Vector2(-6, 5), new Vector2(-5, 5),
                new Vector2(-4, 5), new Vector2(-3, 5), new Vector2(-2, 5), new Vector2(0, 5), new Vector2(1, 5), new Vector2(2, 5),
                new Vector2(3, 5), new Vector2(-7, 6), new Vector2(-6, 6), new Vector2(-5, 6), new Vector2(-4, 6), new Vector2(-3, 6),
                new Vector2(1, 6), new Vector2(2, 6), new Vector2(-6, 7), new Vector2(-4, 7), new Vector2(2, 7), new Vector2(-5, 8)
            ]
        })

        // eyes
        this.addComponent(new PixelShape(), {
            fillStyle: "white",
            pixelSize: 4,
            scale: 1,
            points: [
                new Vector2(-3, -7), new Vector2(1, -7),
                new Vector2(-3, -6), new Vector2(1, -6)
            ]
        })

        // star
        this.addComponent(new PixelShape(), {
            fillStyle: "white",
            pixelSize: 4,
            scale: 0.5,
            points: [
                new Vector2(-2, -21),

                new Vector2(-3, -20), new Vector2(-2, -20), new Vector2(-1, -20),

                new Vector2(-4, -19), new Vector2(-3, -19), new Vector2(-2, -19), new Vector2(-1, -19), new Vector2(0, -19),

                new Vector2(-3, -18), new Vector2(-2, -18), new Vector2(-1, -18),

                new Vector2(-2, -17)
            ]
        })
    }
}