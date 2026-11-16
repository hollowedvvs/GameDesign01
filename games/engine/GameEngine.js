class GameEngine extends Engine {
    static lastTime = 0
    static accumulator = 0

    static start(nextScene, settings) {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)
        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)

        //convert mouse coordinates to canvas position
        addEventListener("mousemove", e => {
            let rect = Engine.canvas.getBoundingClientRect()
            Input.mousemove({
                clientX: e.clientX - rect.left,
                clientY: e.clientY - rect.top
            })
        })

        SceneManager.nextScene = nextScene
        SceneManager.update()

        if (settings) {
            Engine.layers = settings.layers
            Engine.aspectRatio = settings.aspectRatio
            Engine.cameraWidthInWorldSpace = settings.cameraWidthInWorldSpace
        }
        requestAnimationFrame(GameEngine.gameLoop)
    }

    static gameLoop(currentTime) {
        if (GameEngine.lastTime === 0) {
            GameEngine.lastTime = currentTime
        }
        let elapsedTime = currentTime - GameEngine.lastTime
        GameEngine.lastTime = currentTime
        GameEngine.accumulator += elapsedTime

        while (GameEngine.accumulator >= GameTime.fixedDelta) {
            GameEngine.update()
            GameEngine.accumulator -= GameTime.fixedDelta
        }
        GameEngine.draw()
        requestAnimationFrame(GameEngine.gameLoop)
    }

    static update() {
        SceneManager.update()
        SceneManager.currentScene.start()
        SceneManager.currentScene.update()

        Time.update()
        Input.update()
    }
}