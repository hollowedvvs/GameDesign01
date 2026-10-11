class Input {
    //keys currently being held
    static keysDown = []

    //keys pressed this frame
    static keysDownThisFrame = []

    //keys released this frame
    static keysUpThisFrame = []

    //old empty key fields
    //these conflict with the actual keydown and keyup functions
    //static keydown
    //static keyup

    static keydown(event) {
        //browser can repeat keydown while a key is held
        //only adds the key the first time it is pressed
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)

            Input.keysDownThisFrame.push(event.code)
        }
    }

    static keyup(event) {
        let index = Input.keysDown.indexOf(event.code)

        //only removes key if it is currently held
        if (index != -1) {
            Input.keysDown.splice(index, 1)
        }

        Input.keysUpThisFrame.push(event.code)
    }

    static getKey(key) {
        //true for as long as key is held
        return Input.keysDown.includes(key)
    }

    static getKeyDown(key) {
        //true only on the update the key was first pressed
        return Input.keysDownThisFrame.includes(key)
    }

    static getKeyUp(key) {
        //true only on the update the key was released
        return Input.keysUpThisFrame.includes(key)
    }

    static update() {
        //held keys stay
        //one frame inputs get cleared after the game uses them
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
    }
}
