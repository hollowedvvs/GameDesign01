class Engine {
    static canvas
    static ctx

    static currentScene

    //previous browser frame
    static lastTime = 0

    //unprocessed time
    static accumulator = 0


    //delta time aka refresh rate. so 1000 ms per 60 updates
    static fixedDelta = 1000 / 60

    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")
        //fixed to 960x540 for sake of sanity
        Engine.canvas.width = 960
        Engine.canvas.height = 540

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        Engine.currentScene.start()

        //Tell browser to start game loop
        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop(currentTime) {
        // first frame doesnt have a last time
        if (Engine.lastTime === 0) {
            Engine.lastTime = currentTime
        }

        //figures out how much time had passed since the last frame
        let deltaTime = currentTime - Engine.lastTime
        Engine.lastTime = currentTime


        //save that time until at 60
        Engine.accumulator += deltaTime

        //only update the actual game when 16.67 ms has passed
        while (Engine.accumulator >= Engine.fixedDelta) {
            Engine.update()

            // remove the last time adding onto remaining
            Engine.accumulator -= Engine.fixedDelta
        }

        //drawing continues based on this framework
        Engine.draw()

        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        // temp update()
        Engine.currentScene.update()
    }

    static draw() {
        // Expand the size of the canvas
        // Engine.canvas.width = window.innerWidth
        // Engine.canvas.height = window.innerHeight
        Engine.ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height)


        // draw(Engine.ctx)
        Engine.currentScene.draw(Engine.ctx)
    }
}