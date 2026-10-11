class PlayerPowerController extends Component {
    facing = 1

    //pea power
    timeSinceLastLaser = 0
    laserCooldown = 300

    //old fire fuel system
    /*
    fireFuel = 100
    maxFireFuel = 100

    //old held fire drain
    //fireDrainPerSecond = 25

    fireCost = 10

    fireRegenPerSecond = 15
    fireRegenDelay = 1000

    timeSinceFireReleased = 0
    timeSinceLastFire = 0
    fireRate = 100
    */

    //fire power
    maxFireUses = 3
    fireUses = 3

    fireBurstDuration = 1200
    fireRate = 100
    fireCooldown = 1000
    fireRegenTime = 2000

    fireBursting = false
    fireBurstTimer = 0
    timeSinceLastFlame = 0
    fireCooldownTimer = 1000
    fireRegenTimer = 0

    fireDirection = new Vector2(1, 0)

    start() {
        this.timeSinceLastLaser = 0

        //old fire timer
        //this.timeSinceLastFire = 0

        this.timeSinceLastFlame = this.fireRate
        this.fireCooldownTimer = this.fireCooldown
    }

    update() {
        this.timeSinceLastLaser += Engine.fixedDelta

        //old fire timer
        //this.timeSinceLastFire += Engine.fixedDelta

        //gets facing direction from player movement
        let movement = this.gameObject.getComponent(UpdateComponent)

        if (movement) {
            this.facing = movement.facing
        }

        this.updatePea()
        this.updateFire()
    }

    getAttackDirection() {
        //default direction is where player is facing
        let direction = new Vector2(this.facing, 0)

        //aim uses held input
        if (Input.getKey("ArrowUp") || Input.getKey("KeyW")) {
            direction = new Vector2(0, -1)
        }
        else if (Input.getKey("ArrowDown") || Input.getKey("KeyS")) {
            direction = new Vector2(0, 1)
        }

        return direction
    }

    updatePea() {
        //old held input
        //holding space constantly fired after cooldown
        /*
        if (!Input.keysDown.includes("Space")) {
            return
        }
        */

        //one press fires one pea
        if (!Input.getKeyDown("Space")) {
            return
        }

        if (this.timeSinceLastLaser < this.laserCooldown) {
            return
        }

        this.timeSinceLastLaser = 0

        let direction = this.getAttackDirection()

        instantiate(new LaserGameObject(direction), this.transform.position.clone())
    }

    updateFire() {
        //old fuel based fire system
        /*
        let fireDown = Input.getKeyDown("KeyF")
        let seconds = Engine.fixedDelta / 1000

        if (fireDown) {
            this.timeSinceFireReleased = 0

            if (this.fireFuel < this.fireCost) {
                return
            }

            if (this.timeSinceLastFire < this.fireRate) {
                return
            }

            this.timeSinceLastFire = 0

            this.fireFuel -= this.fireCost

            if (this.fireFuel < 0) {
                this.fireFuel = 0
            }

            let direction = this.getAttackDirection()

            instantiate(new FireGameObject(direction), this.transform.position.clone())

            return
        }

        if (!Input.getKey("KeyF")) {
            this.timeSinceFireReleased += Engine.fixedDelta
        }

        if (this.timeSinceFireReleased < this.fireRegenDelay) {
            return
        }

        this.fireFuel += this.fireRegenPerSecond * seconds

        if (this.fireFuel > this.maxFireFuel) {
            this.fireFuel = this.maxFireFuel
        }
        */

        //regen one fire use every 2 seconds
        if (this.fireUses < this.maxFireUses) {
            this.fireRegenTimer += Engine.fixedDelta

            if (this.fireRegenTimer >= this.fireRegenTime) {
                this.fireUses += 1
                this.fireRegenTimer -= this.fireRegenTime
            }
        }
        else {
            this.fireRegenTimer = 0
        }

        //active fire burst
        if (this.fireBursting) {
            this.fireBurstTimer += Engine.fixedDelta
            this.timeSinceLastFlame += Engine.fixedDelta

            if (this.timeSinceLastFlame >= this.fireRate) {
                this.timeSinceLastFlame = 0
                instantiate(new FireGameObject(this.fireDirection), this.transform.position.clone())
            }

            if (this.fireBurstTimer >= this.fireBurstDuration) {
                this.fireBursting = false
                this.fireBurstTimer = 0
                this.fireCooldownTimer = 0
            }

            return
        }

        //delay before another burst can start
        this.fireCooldownTimer += Engine.fixedDelta

        //one press starts one full burst
        if (!Input.getKeyDown("KeyF")) {
            return
        }

        if (this.fireUses <= 0 || this.fireCooldownTimer < this.fireCooldown) {
            return
        }

        this.fireUses -= 1
        this.fireBursting = true
        this.fireBurstTimer = 0
        this.timeSinceLastFlame = this.fireRate
        this.fireDirection = this.getAttackDirection()
    }
}