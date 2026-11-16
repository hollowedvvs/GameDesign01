class EnemyFireController extends ProjectileController {
    //enemy fire settings
    speed = 5

    //same general reach as player fire
    maxDistance = 220

    damage = 0.5

    //enemy fire only hits player
    targetTag = "Player"

}