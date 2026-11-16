class BaseEnemyGameObject extends PhysicsGameObject {
    constructor(typeTag, health, settings = {}) {
        super("Enemy", ["Enemy", typeTag], "Enemies")

        this.settings = settings
        this.absorbPower = settings.absorbPower ?? null
        this.addComponent(new Health(), { health })
    }
}