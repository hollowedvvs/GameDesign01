class Time {
    //time in seconds since the last frame
    /** @type {Number} */
    static deltaTime = 1 / 60

    //total elapsed game time
    /** @type {Number} */
    static time = 0

    //updates elapsed time
    static update() {
        Time.time += Time.deltaTime
    }
}
