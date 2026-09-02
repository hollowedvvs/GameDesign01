class Engine {
    static canvas
    static ctx

    static currentScene

    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        Engine.currentScene.start()

        //Tell browser to start game loop
        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop() {
        Engine.update()
        Engine.draw()

        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
       // temp update()
        Engine.currentScene.update()
    }

    static draw() {
        // Expand the size of the canvas
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

       // draw(Engine.ctx)
       Engine.currentScene.draw(Engine.ctx)
    }
}