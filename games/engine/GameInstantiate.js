//custom game code
//spawns game objects without overwriting rotation already set by the object constructor
function gameInstantiate(gameObject, position = new Vector2(0, 0), rotation = null) {
    if (rotation == null) {
        rotation = gameObject.transform.rotation
    }

    return SceneManager.currentScene.instantiate(gameObject, position, rotation)
}
