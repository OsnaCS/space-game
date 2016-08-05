var toDestroy = undefined;
//clock and timer for destruction delay for explosion
var collisionClock = new THREE.Clock();
var collisionTimer = 1;



function handleAsteroids() {

    for (var i = 0; i <= asteroids.length - 1; i++) {

        // Asteroidenkollision
        for (var j = i + 1; j <= asteroids.length - 1; j++) {
            if (collision.intersectSphereOther(asteroidHitBoxes[i],
                asteroidHitBoxes[j])) {

                asteroids[i].collide(asteroids[j], "asteroid", i, j);
            }
        }
        // Kollision mit Player
        for (var j = 0; j <= playerHitBoxes.length - 1; j++) {
            if (collision.intersectSphereShipHitBox(asteroidHitBoxes[i],

                    playerHitBoxes[j])) {
                //destroyAsteroid(i);
                asteroids[i].collide(player, "player", i);
                // asteroidHitBySpaceship(i);

                player.playerHitByAsteroid(i,j);

                break;
            }
        }

        for (var j = 0; j <= enemies.length - 1; j++) {
            for (var k = 0; k <= enemyHitBoxes[j].length - 1; k++) {
                if (collision.intersectSphereBox(asteroidHitBoxes[i], enemyHitBoxes[j][k])) {
                    // asteroidHitBySpaceship(asteroids[k]);
                    enemies[j].collide("asteroid", j, i);
                }

            }
        }
    }
}


function handleProjectiles() {

    // for every projectile
    for (var i = 0; i <= projectiles.length - 1; i++) {

        var projectileSucceded = false;

        // Asteroidentreffer
        switch (projectiles[i].name) {

            case "LASER": case "Laser":

                for (var j = 0; j <= asteroidHitBoxes.length - 1; j++) {
                    if (collision.intersectPointSphere(projectiles[i].children[0], asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].children[projectiles[i].children.length - 1], asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint25"), asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint50"), asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint75"), asteroidHitBoxes[j])) {
                        successLaser(i);

                        asteroids[j].collide(projectiles[i], "Laser", j);

                        projectileSucceded = true;
                        break;
                    }
                }

                break;


            case "Rocket":  case "GuidedMissile":
                for (var j = 0; j <= asteroidHitBoxes.length - 1; j++) {
                    if (collision.intersectPointSphere(projectiles[i].children[0], asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].children[projectiles[i].children.length - 1], asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint25"), asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint50"), asteroidHitBoxes[j]) ||
                                collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint75"), asteroidHitBoxes[j])) {
                        successRocket(i);
                        toDestroy = j;
                        collisionTimer = 0;

                        asteroids[j].collide(projectiles[i], "Rocket", j);

                        projectileSucceded = true;
                        break;
                    }
                }

                break;


            case "Explosion":
                for (var j = 0; j <= asteroidHitBoxes.length - 1; j++) {
                    if (collision.intersectSphereOther(asteroidHitBoxes[j],
                        projectiles[i])) {

                        asteroids[j].collide(projectiles[i], "Explosion", j);
                    }
                }
                break;


            case "MachineGun":
                for (var j = 0; j <= asteroidHitBoxes.length - 1; j++) {
                    if (collision.intersectPointSphere(projectiles[i].getObjectByName("BoxPoint"), asteroidHitBoxes[j])){
                        successMachineGunBullet(i);

                        asteroids[j].collide(projectiles[i], "MachineGun", j);

                        projectileSucceded = true;
                        break;
                    }
                }
                break;

            case "Shockwave":
                for (var j = 0; j <= asteroidHitBoxes.length - 1; j++) {
                    if (collision.intersectSphereOther(projectiles[i], asteroidHitBoxes[j])){
                        asteroids[j].collide(projectiles[i], "ShockWave", j);
                    }
                }
                break;
        }


        // Collect items via projectiles
        if (projectileSucceded === false) {

            switch (projectiles[i].name) {

                case "Laser": case "LASER":

                    var laserBol = false;

                    for (var j = 0; j <= itemHitBoxes.length - 1; j++) {

                        for (var k = 0; k <= projectiles[i].children.length - 1; k++) {
                            if (collision.intersectPointBox(projectiles[i].children[k], itemHitBoxes[j])) {
                                laserBol = true;
                                break;
                            }
                        }

                        if (laserBol) {
                            successLaser(i);
                            collected(j);
                            break;
                        }
                    }

                    if (laserBol === false ) {
                        for (var j = 0; j < enemies.length; j++) {
                            for (var k = 0; k < enemyHitBoxes[j].length; k++) {
                                for (var l = 0; l <= projectiles[i].children.length - 1; l++) {
                                    if (collision.intersectPointEnemyHitBox(projectiles[i].children[l], enemyHitBoxes[j][k], j)) {
                                        laserBol = true;
                                        break;
                                    }
                                }
                                if (laserBol) {
                                    successLaser(i);
                                    enemies[j].collide("Laser", j, i);
                                    //console.log("enemy hit by laser");
                                    break;
                                }
                            }
                            if (laserBol) {
                                break;
                            }
                        }
                    }

                    if (laserBol === false ) {
                        for (var j = 0; j < playerHitBoxes.length; j++) {
                            for (var k = 0; k <= projectiles[i].children.length - 1; k++) {
                                if (collision.intersectPointShipHitBox(projectiles[i].children[k], playerHitBoxes[j])) {
                                    laserBol = true;
                                    break;
                                }
                            }
                            if (laserBol) {
                                successLaser(i);
                                player.playerHitByLaser();
                                //console.log("player hit by laser");
                                break;
                            }
                        }
                        if (laserBol) {
                            break;
                        }

                    }

                break;


                case "Rocket":

                    var rocketBol = false;

                    for (var j = 0; j <= itemHitBoxes.length - 1; j++) {

                        if (collision.intersectPointBox(projectiles[i].children[projectiles[i].length - 1], itemHitBoxes[j]) ||
                               collision.intersectPointBox(projectiles[i].children[0], itemHitBoxes[j]) ||
                               collision.intersectPointBox(projectiles[i].getObjectByName("BoxPoint25"), itemHitBoxes[j]) ||
                               collision.intersectPointBox(projectiles[i].getObjectByName("BoxPoint50"), itemHitBoxes[j]) ||
                               collision.intersectPointBox(projectiles[i].getObjectByName("BoxPoint75"), itemHitBoxes[j])) {

                            rocketBol = true;
                            collected(j);
                            break;
                        }
                    }

                    if (rocketBol === false) {

                        for (var j = 0; j < enemies.length; j++) {

                            for (var k = 0; k < enemyHitBoxes[j].length; k++) {

                                for (var l = 0; l <= projectiles[i].children.length - 1; l++) {
                                    if (collision.intersectPointEnemyHitBox(projectiles[i].children[l], enemyHitBoxes[j][k], j)) {
                                        //console.log("enemy hit by Rocket");
                                        rocketBol = true;
                                        break;
                                    }
                                }

                                if (rocketBol) {
                                    successRocket(i);
                                    enemies[j].collide("Rocket", j, i);
                                    break;
                                }

                            }

                            if (rocketBol) {
                                break;
                            }

                        }
                    }
                    break;


                case "Explosion":
                    for (var j = 0; j <= itemHitBoxes.length - 1; j++) {
                        if (collision.intersectSphereBox(itemHitBoxes[j],
                            projectiles[i])) {
                            collected(j);
                        }
                    }

                    for (var j = 0; j <= enemies.length - 1; j++) {

                        for (var k = 0; k < enemyHitBoxes[j].length; k++) {
                            if (collision.intersectSphereBox(projectiles[i], enemyHitBoxes[j][k])) {
                                enemies[j].collide("Explosion", j, i);
                                //console.log("enemy hit by Explosion");
                                break;
                            }
                        }
                    }

                    break;


                case "MachineGun":
                    var MGbol = false
                    for (var j = 0; j <= enemies.length - 1; j++) {
                        for (var k = 0; k <= enemyHitBoxes[j].length - 1; k++) {
                            if (collision.intersectPointEnemyHitBox(projectiles[i].getObjectByName("BoxPoint"), enemyHitBoxes[j][k], j)) {
                                MGbol = true;
                                successMachineGunBullet(i);

                                
                                console.log("enemy hit by MachineGun");

                                break;
                            }
                        }
                        if (MGbol) {
                            break;
                        }
                    }
                    break;


                case "Shockwave":

                    for (var j = 0; j <= enemies.length - 1; j++) {

                        for (var k = 0; k < enemyHitBoxes[j].length; k++) {
                            if (collision.intersectSphereBox(projectiles[i], enemyHitBoxes[j][k])) {
                                enemies[j].collide("Shockwave", j, i);
                                //console.log("enemy hit by Shockwave");
                                break;
                            }
                        }
                    }

                    break;

            }

        }
    }

}

/** NICHT LÖSCHEN **/
function handlePlayerEnemyCollision() {

    if (enemies !== undefined) {

        for (var i = 0; i <= playerHitBoxes.length - 1; i++) {
            for (var j = 0; j <= enemies.length - 1; j++) {
                for (var k = 0; k <= enemies[j].length - 1; k++) {
                   if (intersectPlayerHitBoxEnemyBox(playerHitboxes[i], enemyHitBoxes[j][k], j)) {
                        player.playerHitByAsteroid();
                        // enemyPlayerCollision(enemies[j]);
                    }
                }
            }
        }

    }

}
/** NICHT LÖSCHEN **/
function handleEnemyEnemyCollision() {

    // for (var i = 0; i <= enemies.length - 2; i++) {
    //     var enemyHitboxes1 = getEnemyHitboxes(enemies[i]); {
    //         for (var j = 0; j < enemyHitboxes1.length; j++) {
    //             for (var k = i+1; k <= enemies.length - 1; k++) {
    //                 var enemyHitboxes2 = getEnemyHitboxes(enemies[k]);
    //                 for (var l = 0; l < enemyHitboxes2.length; l++) {
    //                     if (intersectBoxBox(enemyHitboxes1[j], enemyHitboxes2[l])) {
    //                         enemyEnemyCollision(enemies[i], enemies[k]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

}


function handlePlayerPopupCollision() {

    for (var i = 0; i < playerHitBoxes.length; i++) {
        for (var j = 0; j < itemHitBoxes.length; j++) {
            if (collision.intersectShipHitBoxBox(playerHitBoxes[i],
                itemHitBoxes[j])) {
                collected(j);
            }
        }
    }

}

function handleCollision() {

    collisionTimer += collisionClock.getDelta();
    handlePlayerPopupCollision();
    handleAsteroids();
    handleProjectiles();
    /** NICHT LÖSCHEN **/
    handlePlayerEnemyCollision();
    //handleEnemyEnemyCollision();

    //check if Asteroid needs to be destroyed. Delay between hit and destruction implemented to give explosion time to develop
    if (toDestroy !== undefined && collisionTimer > 1) {
        asteroids[toDestroy].collide(null, "Rocket", toDestroy);
        toDestroy = undefined;
        asteroidAudio.play();
    }

}
