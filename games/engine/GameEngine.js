//custom game code
//keeps this game at 60 updates per second and a fixed 960x540 canvas without changing the class Engine
class GameEngine extends Engine {
    static lastTime = 0
    static accumulator = 0

    static start(nextScene, settings) {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        //game resolution
        Engine.canvas.width = 960
        Engine.canvas.height = 540

        //class input events
        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)
        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)
        addEventListener("mousemove", Input.mousemove)

        SceneManager.nextScene = nextScene

        //loads first scene before the first frame draws
        SceneManager.update()

        if (settings) {
            Engine.layers = settings.layers
        }

        requestAnimationFrame(GameEngine.gameLoop)
    }

    static gameLoop(currentTime) {
        if (GameEngine.lastTime === 0) {
            GameEngine.lastTime = currentTime
        }

        //time since the last browser frame
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

    static draw() {
        SceneManager.currentScene.draw(Engine.ctx)
    }
}