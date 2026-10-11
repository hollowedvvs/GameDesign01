class Scene {
    gameObjects = []

    mainCamera

    //world physics
    gravity = 0.8
    airFriction = 0.03

    instantiate(gameObject, position = new Vector2(0, 0), rotation = null) {
        this.gameObjects.push(gameObject)

        gameObject.transform.position = position

        //old rotation system
        //always reset object rotation to 0
        /*
        gameObject.transform.rotation = rotation
        */

        //only overrides rotation when one is actually given
        //otherwise keeps rotation set by the gameobject itself
        if (rotation != null) {
            gameObject.transform.rotation = rotation
        }

        return gameObject
    }

    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
        }
    }

    update() {
        //old destroy check
        /*
        for (const gameObject of this.gameObjects) {
            if (!gameObject.destroyed) {
                gameObject.update()
            }
        }
        */

        //updates objects before removing marked ones
        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }

        //old destroy cleanup
        /*
        this.gameObjects = this.gameObjects.filter(
            gameObject => !gameObject.destroyed
        )
        */

        //class destroy cleanup
        let temp = []

        for (const gameObject of this.gameObjects) {
            if (!gameObject.markForDestroy) {
                temp.push(gameObject)
            }
        }

        this.gameObjects = temp
    }

    draw(ctx) {
        //old background clear
        /*
        ctx.fillStyle = this.mainCamera.backgroundColor
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)
        */

        //clears the entire canvas before drawing the new frame
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height)

        //draws background after clearing
        ctx.fillStyle = this.mainCamera.backgroundColor
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)

        ctx.restore()

        //start camera code
        ctx.save()

        ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
        ctx.translate(-this.mainCamera.transform.position.x, -this.mainCamera.transform.position.y)

        //named layer draw
        for (const layer of Engine.layers.filter(l => l != "UI")) {
            for (const gameObject of this.gameObjects.filter(go => go.layer == layer)) {
                gameObject.draw(ctx)
            }
        }

        //camera stops affecting anything after this
        ctx.restore()

        //ui stays attached to screen
        for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")) {
            gameObject.draw(ctx)
        }
    }

    constructor() {
        let cameraGameObject = new GameObject("MainCamera", ["MainCamera"])
        let camera = new Camera()

        cameraGameObject.addComponent(camera)
        this.instantiate(cameraGameObject)

        //scene keeps direct reference to its own camera
        this.mainCamera = camera
    }
}

function instantiate(gameObject, position = new Vector2(0, 0), rotation = null) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation)
}