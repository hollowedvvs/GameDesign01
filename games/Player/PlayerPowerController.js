class PlayerPowerController extends Component {
    facing = 1

    //currently equipped power
    currentPower = "pea"

    //pea power
    timeSinceLastPea = 0
    peaCooldown = 300

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
        this.timeSinceLastPea = 0

        //old fire timer
        //this.timeSinceLastFire = 0

        this.timeSinceLastFlame = this.fireRate
        this.fireCooldownTimer = this.fireCooldown
    }

    update() {
        this.timeSinceLastPea += GameTime.fixedDelta

        //old fire timer
        //this.timeSinceLastFire += GameTime.fixedDelta

        //fire charges regenerate no matter which power is equipped
        this.updateFireRegen()

        //gets facing direction from player movement
        let movement = this.gameObject.getComponent(UpdateComponent)

        if (movement) {
            this.facing = movement.facing
        }

        this.updatePowerSwitch()

        if (this.currentPower == "pea") {
            this.updatePea()
        }
        else if (this.currentPower == "fire") {
            this.updateFire()
        }
    }

    updatePowerSwitch() {
        //f swaps between powers
        if (!GameInput.getKeyDown("KeyF")) {
            return
        }

        if (this.currentPower == "pea") {
            this.setPower("fire")
        }
        else if (this.currentPower == "fire") {
            this.setPower("pea")
        }
    }

    setPower(power) {
        //switching away during a burst starts its cooldown
        if (this.currentPower == "fire" && power != "fire" && this.fireBursting) {
            this.fireCooldownTimer = 0
        }

        this.currentPower = power

        //stops fire burst when switching away
        if (power != "fire") {
            this.fireBursting = false
            this.fireBurstTimer = 0
        }

        //updates star color
        let stars = GameObject.findGameObjectsWithTag("PlayerPower")

        if (stars.length > 0) {
            stars[0].setPower(power)
        }
    }

    getAttackDirection() {
        //default direction is where player is facing
        let direction = new Vector2(this.facing, 0)

        //aim uses held input
        if (GameInput.getKey("ArrowUp") || GameInput.getKey("KeyW")) {
            direction = new Vector2(0, -1)
        }
        else if (GameInput.getKey("ArrowDown") || GameInput.getKey("KeyS")) {
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
        if (!GameInput.getKeyDown("Space")) {
            return
        }

        if (this.timeSinceLastPea < this.peaCooldown) {
            return
        }

        this.timeSinceLastPea = 0

        let direction = this.getAttackDirection()

        gameInstantiate(new PeaGameObject(direction), this.gameObject.getCenterPosition())
    }

    updateFireRegen() {
        //regen one fire use every 2 seconds
        if (this.fireUses < this.maxFireUses) {
            this.fireRegenTimer += GameTime.fixedDelta

            if (this.fireRegenTimer >= this.fireRegenTime) {
                this.fireUses += 1
                this.fireRegenTimer -= this.fireRegenTime
            }
        }
        else {
            this.fireRegenTimer = 0
        }
    }

    updateFire() {
        //old fuel based fire system
        /*
        let fireDown = GameInput.getKeyDown("KeyF")
        let seconds = GameTime.fixedDelta / 1000

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

        if (!GameInput.getKey("KeyF")) {
            this.timeSinceFireReleased += GameTime.fixedDelta
        }

        if (this.timeSinceFireReleased < this.fireRegenDelay) {
            return
        }

        this.fireFuel += this.fireRegenPerSecond * seconds

        if (this.fireFuel > this.maxFireFuel) {
            this.fireFuel = this.maxFireFuel
        }
        */

        //active fire burst
        if (this.fireBursting) {
            //ignore extra presses during burst
            GameInput.getKeyDown("Space")

            this.fireBurstTimer += GameTime.fixedDelta
            this.timeSinceLastFlame += GameTime.fixedDelta

            if (this.timeSinceLastFlame >= this.fireRate) {
                this.timeSinceLastFlame = 0
                gameInstantiate(new FireGameObject(this.fireDirection), this.gameObject.getCenterPosition())
            }

            if (this.fireBurstTimer >= this.fireBurstDuration) {
                this.fireBursting = false
                this.fireBurstTimer = 0
                this.fireCooldownTimer = 0
            }

            return
        }

        //delay before another burst can start
        this.fireCooldownTimer += GameTime.fixedDelta

        //space starts one full burst
        if (!GameInput.getKeyDown("Space")) {
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