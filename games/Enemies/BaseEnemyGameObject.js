class BaseEnemyGameObject extends PhysicsGameObject {
    settings = {}

    constructor(typeTag, health, settings = {}) {
        //old setup only passed detection range as a number
        /*
        constructor(typeTag, health, detectionRange) {
            super("Enemy", ["Enemy", typeTag, "Detection:" + detectionRange], "default")
        }
        */

        //keeps old enemies working until they get converted
        if (typeof settings === "number") {
            settings = { detectionRange: settings }
        }

        let detectionRange = settings.detectionRange ?? 0

        super("Enemy", ["Enemy", typeTag, "Detection:" + detectionRange], "default")

        this.settings = settings

        //old Momentum setup
        //now handled by PhysicsGameObject
        /*
        this.addComponent(new Momentum())
        */

        this.addComponent(new Health(), { health: health })
    }

    addEnemyController(controller) {
        this.addComponent(controller)
    }

    addEnemyShape(fillStyle) {
        //temporary square enemy shape
        this.addComponent(new Polygon(), {
            fillStyle: fillStyle,
            points: [new Vector2(-20, -20), new Vector2(20, -20), new Vector2(20, 20), new Vector2(-20, 20)]
        })
    }

    getSetting(name, fallback = null) {
        if (this.settings[name] == null) {
            return fallback
        }

        return this.settings[name]
    }
}