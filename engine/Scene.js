
class Scene {
    //gameobjects currently inside the scene
    /** @type {GameObject[]} */
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
    /**
     * @param {GameObject} gameObject
     * @param {Vector2} position
     * @param {Number} rotation
     */
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

        //run fixed updates on all gameobjects
        for (const gameObject of this.gameObjects) {
            gameObject.broadcastMessage("fixedUpdate")
        }

        //collision
        const collidable = GameObject.findGameObjectsByType(Collider)

        //mouse collisions
        if (Input.mousePosition) {
            let matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())

            let worldPositionDOMPoint = matrix.inverse().transformPoint(Input.mousePosition)
            let worldPosition = new Vector2(worldPositionDOMPoint.x, worldPositionDOMPoint.y)

            for (const gameObject of collidable) {
                if (Collisions.isCollisionPointPolygon(collidable.layer == "UI" ? Input.mousePosition : worldPosition, gameObject)) {
                    gameObject.broadcastMessage("onMouseOver", [])
                }
            }
        }

        //polygon collisions
        const physicalCollisions = []
        for (let i = 0; i < collidable.length; i++) {
            for (let j = i + 1; j < collidable.length; j++) {
                const one = collidable[i]
                const two = collidable[j]
                if (!one.getComponent(RigidBody) && !two.getComponent(RigidBody))
                    continue

                const minimumTransformVector = Collisions.isCollisionPolygonPolygon(collidable[i], collidable[j])
                if (minimumTransformVector) {


                    if (!one.getComponent(Collider).isTrigger && !two.getComponent(Collider).isTrigger) {
                        collidable[i].broadcastMessage("onCollisionStay", [collidable[j], minimumTransformVector])
                        collidable[j].broadcastMessage("onCollisionStay", [collidable[i], minimumTransformVector.scaled(-1)])
                        physicalCollisions.push({ one: collidable[i], two: collidable[j], minimumTransformVector })

                    }
                    else {
                        collidable[i].broadcastMessage("onTriggerStay", [collidable[j], minimumTransformVector])
                        collidable[j].broadcastMessage("onTriggerStay", [collidable[i], minimumTransformVector.scaled(-1)])
                    }
                }
            }
        }

        //physics
        for (const physicalCollision of physicalCollisions) {
            if (physicalCollision.one.getComponent(RigidBody)) {
                physicalCollision.one.transform.position.plusEquals(physicalCollision.minimumTransformVector)
            }
            if (physicalCollision.two.getComponent(RigidBody)) {
                physicalCollision.two.transform.position.plusEquals(physicalCollision.minimumTransformVector.scaled(-1))
            }
        }

        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }

        let temp = []
        for (const gameObject of this.gameObjects) {
            if (!gameObject.markForDestroy) temp.push(gameObject)
        }

        this.gameObjects = temp
    }

    //draws world layers through the camera then draws ui without camera movement
    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.fillStyle = Camera.main.backgroundColor
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)

        //start camera code
        ctx.save()
        ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
        //ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)
        ctx.setTransform(ctx.getTransform().multiply(Camera.main.transform.getWorldMatrix().inverse()))

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
/**
 * @param {GameObject} gameObject
 * @param {Vector2} position
 * @param {Number} rotation
 */
function instantiate(gameObject, position = new Vector2(0, 0), rotation = 0) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation)
}
