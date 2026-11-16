class Time {
    //time in seconds since the last frame
    static deltaTime = 1 / 60

    //total elapsed game time
    static time = 0

    //updates elapsed time
    static update() {
        Time.time += Time.deltaTime
    }
}
