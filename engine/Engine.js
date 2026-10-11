class Engine {
    static canvas
    static ctx

    //static currentScene

    //class default layer system
    static layers = ["default", "background", "projectiles", "UI"]

    //previous browser frame
    static lastTime = 0

    //unprocessed time
    static accumulator = 0

    //delta time aka refresh rate. so 1000 ms per 60 updates
    static fixedDelta = 1000 / 60

    static start(nextScene, settings) {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        //fixed to 960x540 for sake of sanity
        Engine.canvas.width = 960
        Engine.canvas.height = 540

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        SceneManager.nextScene = nextScene

        //keeping this because fixed timestep may not update on first browser frame
        SceneManager.update()

        if (settings) {
            Engine.layers = settings.layers
        }

        //tell browser to start game loop
        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop(currentTime) {
        //first frame doesnt have a last time
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
            Engine.accumulator -= Engine.fixedDelta
        }

        //drawing continues based on this framework
        Engine.draw()

        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        SceneManager.update()

        //class now starts new objects before updating them
        SceneManager.currentScene.start()

        //objects handle movement and behavior
        SceneManager.currentScene.update()

        //collision happens after objects move
        CollisionManager.update()

        //clears one frame inputs after everything gets to use them
        Input.update()
    }

    static draw() {
        Engine.ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height)
        SceneManager.currentScene.draw(Engine.ctx)
    }
}