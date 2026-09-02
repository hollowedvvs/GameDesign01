class Input {
    static keysDown = []

    static keydown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
        }
    }

    static keyup(event) {
        let index = Input.keysDown.indexOf(event.code)

        if (index != -1) {
            Input.keysDown.splice(index, 1)
        }
    }
}