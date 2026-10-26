
class Scene {
    //gameobjects currently inside the scene
    gameObjects = []

    constructor(backgroundColor) {
        let cameraGameObject = new GameObject("MainCamera", ["MainCamera"])
        cameraGameObject.addComponent(new Camera())
        this.instantiate(cameraGameObject)

        if (backgroundColor) {
            cameraGameObject.getComponent(Camera).backgroundColor = backgroundColor
        }
    }

    //adds a gameobject to this scene and sets its transform
    instantiate(gameObject, position = new Vector2(0, 0), rotation = 0) {
        this.gameObjects.push(gameObject)
        gameObject.transform.position = position
        gameObject.transform.rotation = rotation
        return gameObject
    }

    //starts every gameobject
    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
        }
    }

    //updates every gameobject then removes anything marked for destroy
    update() {
        //collision
        const collidable = GameObject.findGameObjectsByType(Collider)

        if (InputDeviceInfo.mousePosition) {
            let matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())

            let worldPositionDOMPoint = matrix.inverse().transformPoint(InputDeviceInfo.mousePosition)
            let worldPosition = new Vector2(worldPositionDOMPoint.x, worldPositionDOMPoint.y)

            for (const gameObject of collidable) {
                if (Collisions.isCollisionPointPolygon(worldPosition, gameObject)) {
                    gameObject.broadcastMessage("onMouseOver", [])
                }
            }
        }

        for (let i = 0; i < collidable.length; i++) {
            for (let j = i + 1; j < collidable.length; j++) {
                if (Collisions.isCollisionPointPolygon(collidable[i], collidable[j])) {
                    collidable[i].broadcastMessage("onCollisionStay", [collidable[j]])
                    collidable[j].broadcastMessage("onCollisionStay", [collidable[i]])
                }
            }
        }

        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }

        let temp = []

        for (const gameObject of this.gameObjects) {
            if (!gameObject.markForDestroy) {
                temp.push(gameObject)
            }
        }

        this.gameObjects = temp
    }

    //draws world layers through the camera then draws ui without camera movement
    draw(ctx) {
        ctx.fillStyle = Camera.main.backgroundColor
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)

        //start camera code
        ctx.save()
        ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
        ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)

        for (const layer of Engine.layers.filter(l => l != "UI")) {
            for (const gameObject of this.gameObjects.filter(go => go.layer == layer)) {
                gameObject.draw(ctx)
            }
        }

        ctx.restore()
        //stop camera code

        //ui layer isnt affected by the camera
        for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")) {
            gameObject.draw(ctx)
        }
    }
}

//creates a gameobject in the current scene
function instantiate(gameObject, position = new Vector2(0, 0), rotation = 0) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation)
}
