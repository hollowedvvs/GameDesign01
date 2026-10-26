//custom game code
//gives readable held, pressed, and released checks using the class Input arrays
class GameInput {
    static getKey(key) {
        return Input.keysDown.includes(key)
    }

    static getKeyDown(key) {
        return Input.keysDownThisFrame.includes(key)
    }

    static getKeyUp(key) {
        return Input.keysUpThisFrame.includes(key)
    }
}
