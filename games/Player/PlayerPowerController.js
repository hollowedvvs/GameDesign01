class PlayerPowerController extends Component {
    facing = 1
    currentPower = "pea"

    //pea power
    timeSinceLastPea = 0
    peaCooldown = 300

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
        this.timeSinceLastFlame = this.fireRate
        this.fireCooldownTimer = this.fireCooldown
    }

    update() {
        this.timeSinceLastPea += GameTime.fixedDelta
        this.updateFireRegen()

        let movement = this.gameObject.getComponent(UpdateComponent)
        if (movement) this.facing = movement.facing

        this.updatePowerSwitch()

        if (this.currentPower == "pea") this.updatePea()
        else if (this.currentPower == "fire") this.updateFire()
    }

    updatePowerSwitch() {
        if (!Input.keysDownThisFrame.includes("KeyF")) return

        //f swaps between powers
        if (this.currentPower == "pea") this.setPower("fire")
        else if (this.currentPower == "fire") this.setPower("pea")
    }

    setPower(power) {
        //switching during a burst starts cooldown
        if (this.currentPower == "fire" && power != "fire" && this.fireBursting) {
            this.fireCooldownTimer = 0
        }

        this.currentPower = power

        //stop burst when changing powers
        if (power != "fire") {
            this.fireBursting = false
            this.fireBurstTimer = 0
        }

        //update star color
        let stars = GameObject.findGameObjectsWithTag("PlayerPower")
        if (stars.length > 0) stars[0].setPower(power)
    }

    getAttackDirection() {
        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) return new Vector2(0, -1)
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) return new Vector2(0, 1)
        return new Vector2(this.facing, 0)
    }

    updatePea() {
        if (!Input.keysDownThisFrame.includes("Space") || this.timeSinceLastPea < this.peaCooldown) return

        this.timeSinceLastPea = 0
        gameInstantiate(new PeaGameObject(this.getAttackDirection()), this.gameObject.getCenterPosition())
    }

    updateFireRegen() {
        //regenerate one fire use every two seconds
        if (this.fireUses < this.maxFireUses) {
            this.fireRegenTimer += GameTime.fixedDelta

            if (this.fireRegenTimer >= this.fireRegenTime) {
                this.fireUses += 1
                this.fireRegenTimer -= this.fireRegenTime
            }
        }
        else this.fireRegenTimer = 0
    }

    updateFire() {
        if (this.fireBursting) {
            //continue active fire burst
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

        this.fireCooldownTimer += GameTime.fixedDelta

        //start a new burst if available
        if (!Input.keysDownThisFrame.includes("Space")) return
        if (this.fireUses <= 0 || this.fireCooldownTimer < this.fireCooldown) return

        this.fireUses -= 1
        this.fireBursting = true
        this.fireBurstTimer = 0
        this.timeSinceLastFlame = this.fireRate
        this.fireDirection = this.getAttackDirection()
    }
}