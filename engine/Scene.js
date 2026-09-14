class Scene {
    gameObjects = []

    instantiate(gameObject, position = new Vector2(0, 0)) {
        this.gameObjects.push(gameObject)
        gameObject.transform.position = position
    }

    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
        }
    }

    update() {
        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }

        this.gameObjects = this.gameObjects.filter(
            gameObject => !gameObject.destroyed
        )
    }

    draw(ctx) {
        let drawOrder = [...this.gameObjects].sort(
            (a, b) => a.layer - b.layer
        )

        for (const gameObject of drawOrder) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position = new Vector2(0, 0)) {
    Engine.currentScene.instantiate(gameObject, position)
}