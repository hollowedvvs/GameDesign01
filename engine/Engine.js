class Engine {
    static canvas

    static ctx

    static layers = ["default", "UI"]

    static aspectRatio

    static cameraWidthInWorldSpace

    static letterBoxingWidth = 0
    static letterBoxingHeight = 0



    static start(nextScene, settings) {
        //grabs the canvas
        Engine.canvas = document.querySelector("#canv")

        //canvas can use 2d or 3d so this grabs the 2d context
        Engine.ctx = Engine.canvas.getContext("2d")

        //keyboard input listeners
        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        //mouse input listeners
        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)
        addEventListener("mousemove", Input.mousemove)
        //ui context menu
        addEventListener("contextmenu", e=>e.preventDefault())

        SceneManager.nextScene = nextScene

        if (settings) {
            Engine.layers = settings.layers
            Engine.aspectRatio = settings.aspectRatio
            Engine.cameraWidthInWorldSpace = settings.cameraWidthInWorldSpace
        }

        //starts the game loop when the browser is ready
        requestAnimationFrame(Engine.gameLoop)
    }

    //main game loop
    static gameLoop() {
        SceneManager.update()

        //update then draw
        Engine.update()
        Engine.draw()

        Time.update()
        Input.update()

        //runs again when the browser is ready
        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        SceneManager.currentScene.start()
        SceneManager.currentScene.update()
    }

    static draw() {
        //matches canvas to the browser window
        //changing the canvas size also clears it
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight
        SceneManager.currentScene.draw(Engine.ctx)
    }
}
