class GameObject {
    //old number layer system
    //layer = 0

    //named layer system
    layer = "default"

    flipX = false
    components = []
    tags = []

    //marks object to be removed
    markForDestroy = false

    //kept for old destroy checks
    destroyed = false

    name

    destroy() {
        this.markForDestroy = true

        //keeps old code working
        this.destroyed = true
    }

    //transform is always the first component
    get transform() {
        return this.components[0]
    }

    constructor(name, tags = [], layer = 'default') {
        this.addComponent(new Transform())
        this.name = name
        this.tags = tags
        this.layer = layer
    }

    addComponent(component, parameters) {
        Object.assign(component, parameters)
        this.components.push(component)
        component.gameObject = this
    }

    //sends function to every component
    broadcastMessage(message, args = []) {
        for (const component of this.components) {
            component[message]?.(...args)
        }
    }

    getComponent(type) {
        return this.components.find(c => c instanceof type)
    }

    start() {
        for (const component of this.components.filter(c => !c.didStart)) {
            component.start?.()
            component.didStart = true
        }
    }

    update() {
        for (const component of this.components) {
            component.update?.()
        }
    }

    draw(ctx) {
        ctx.save()

        //adds this objects world transform before drawing
        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))

        for (const component of this.components) {
            component.draw?.(ctx)
        }

        //returns canvas to how it was before this object
        ctx.restore()
    }

    static find(name) {
        return SceneManager.currentScene.gameObjects.find(go => go.name === name && !go.destroyed)
    }

    static findGameObjectsWithTag(tag) {
        return SceneManager.currentScene.gameObjects.filter(go => go.tags.includes(tag))
    }

    //finds objects based on component type
    static findGameObjectsByType(type) {
        return SceneManager.currentScene.gameObjects.filter(go => go.components.find(c => c instanceof type))
    }
}
