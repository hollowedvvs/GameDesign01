class Input {
    //keys currently being held
    /** @type {string[]} */
    static keysDown = []

    //keys pressed or released this frame
    static keysDownThisFrame = []
    static keysUpThisFrame = []

    //mouse buttons currently held, pressed, or released this frame
    static mouseButtonsDown = []
    static mouseButtonsDownThisFrame = []
    static mouseButtonsUpThisFrame = []

    static mousePosition
    static mousePositionLastFrame
    static mouseDelta

    static mousemove(event) {
        if (Input.mousePosition) {
            Input.mousePositionLastFrame = Input.mousePosition
        }

        Input.mousePosition = new Vector2(event.clientX, event.clientY)

        if (Input.mousePositionLastFrame) {
            Input.mouseDelta = Input.mousePosition.minus(Input.mousePositionLastFrame)
        }
    }

    static mousedown(event) {
        if (!Input.mouseButtonsDown.includes(event.button)) {
            Input.mouseButtonsDown.push(event.button)
            Input.mouseButtonsDownThisFrame.push(event.button)
        }
    }

    static mouseup(event) {
        let index = Input.mouseButtonsDown.indexOf(event.button)

        //removes the button from the held array using its index
        Input.mouseButtonsDown.splice(index, 1)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

    /** @param {KeyboardEvent} event */
    static keydown(event) {
        //doesnt add the key again if it is already held
        //event.code is used for the key value
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    /** @param {KeyboardEvent} event */
    static keyup(event) {
        //javascript needs the index before removing something from an array
        let index = Input.keysDown.indexOf(event.code)

        //removes the key from the held array using its index
        Input.keysDown.splice(index, 1)
        Input.keysUpThisFrame.push(event.code)
    }

    static update() {
        //one frame inputs are cleared after the frame
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.mouseButtonsDownThisFrame = []
        Input.mouseButtonsUpThisFrame = []
    }
}
