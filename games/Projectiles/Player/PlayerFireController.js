class PlayerFireController extends ProjectileController {
    //slower than pea
    speed = 5

    //flame range
    maxDistance = 220

    //small damage per flame
    //full burst = more damage
    damage = 0.5

    //player fire only hits enemies
    targetTag = "Enemy"

    //gives points
    pointsOnHit = 1
}