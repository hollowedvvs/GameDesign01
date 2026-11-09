
class GameObject {
    //components attached to this gameobject
    /** @type {Component[]} */
    components = []

    //marks the gameobject to be removed by the scene
    /** @type {Boolean} */
    markForDestroy = false

    /** @type {String} */
    name

    tags = []
    layer = "default"

    //transform is always the first component
    /** @returns {Transform} */
    get transform() {
        return /** @type {Transform} */ (this.components[0])
    }

    /**
     * @param {String} name
     */
    constructor(name, tags = [], layer = "default") {
        this.addComponent(new Transform())
        this.name = name
        this.tags = tags
        this.layer = layer
    }

    //adds a component and applies any given settings to it
    /**
     * @param {Component} component
     * @param {Object} parameters
     */
    addComponent(component, parameters) {
        Object.assign(component, parameters)
        this.components.push(component)
        component.gameObject = this
    }

    //calls a function on every component that has it
    broadcastMessage(message, args = []) {
        for (const component of this.components) {
            component[message]?.(...args)
        }
    }

    //starts components once
    start() {
        for (const component of this.components.filter(c => !c.didStart)) {
            // @ts-expect-error
            component.start?.()
            component.didStart = true
        }
    }

    //updates every component that has an update
    update() {
        for (const component of this.components) {
            // @ts-expect-error
            component.update?.()
        }
    }

    //draws the object using its world transform
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.save()
        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))

        for (const component of this.components) {
            // @ts-expect-error
            component.draw?.(ctx)
        }

        ctx.restore()
    }

    //marks this object for destruction
    destroy() {
        this.markForDestroy = true
    }

    //gets the first component matching a class
    /**
     * @template {Component} T
     * @param {new (...args: any[]) => T} type
     * @returns {T|undefined}
     */
    getComponent(type) {
        return /** @type {T|undefined} */ (this.components.find(c => c instanceof type))
    }

    //finds the first gameobject with a matching name
    /**
     * @param {String} name
     * @returns {GameObject|undefined}
     */
    static find(name) {
        //old function version
        //return SceneManger.currentScene.gameObjects.find(function(go){return go.name == name})
        return SceneManager.currentScene.gameObjects.find(go => go.name == name)
    }

    //finds every gameobject with a matching tag
    static findGameObjectsWithTag(tag) {
        return SceneManager.currentScene.gameObjects.filter(go => go.tags.includes(tag))
    }

    //finds every gameobject with a component of the given type
    static findGameObjectsByType(type) {
        return SceneManager.currentScene.gameObjects.filter(go => go.components.find(c => c instanceof type))
    }
}
