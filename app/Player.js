var ship, frontVector, backVector, directionVector;
var hitBoxCenter, hitBoxLeftWing, hitBoxRightWing;
var playerHitBoxes = [];
var cross;

frontVector = new THREE.Vector3(0, 0, 0);

backVector = new THREE.Vector3(0, 0, 0);
directionVector = new THREE.Vector3(0, 0, 0);


function Player() {

    var startVector = new THREE.Vector3(0, 0, 0);
    var endVector = new THREE.Vector3(0, 0, 0);
    var particleRay;


    function createRay() {
        particleRay = new RayParticleRenderer(0x2255ff, 100, fileLoader.get("particle"), startVector, endVector);
    }
    createRay();

    // TODO: auslagern in Mathe-Klasse
    function getOrthognalVector(vector1, vector2) {
        var v1 = vector1.clone();
        var v2 = vector2.clone();
        return new THREE.Vector3().crossVectors(v1, v2);
    }

    return {

        init: function () {
            var geometry = fileLoader.get("HeroShipV5");
            var texture = fileLoader.get("TextureHero");

            ship = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({map: texture})
            );

            ship.position.set(0, 0, 0);
            scene.add(ship);



            var hitBoxCenterGeometry = new THREE.BoxGeometry(5,2,20);
            var hitBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            hitBoxCenter = new THREE.Mesh(hitBoxCenterGeometry, hitBoxMaterial);

            var hitBoxCenterGeometry = new THREE.BoxGeometry(10,2,5);
            hitBoxLeftWing = new THREE.Mesh(hitBoxCenterGeometry, hitBoxMaterial);
            hitBoxLeftWing.position.x = -5;

            var hitBoxCenterGeometry = new THREE.BoxGeometry(10,2,5);
            hitBoxRightWing = new THREE.Mesh(hitBoxCenterGeometry, hitBoxMaterial);
            hitBoxRightWing.position.x = 5;

            playerHitBoxes.push(hitBoxCenter);
            playerHitBoxes.push(hitBoxLeftWing);
            playerHitBoxes.push(hitBoxRightWing);

            // ship.add(hitBoxLeftWing);
            // ship.add(hitBoxRightWing);
            // ship.add(hitBoxCenter);
        },

        updateParticleValues: function () {
            particleRay.reset();

            // Schiffsposition und Richtingsvektor bestimmen
            var pos = ship.position;
            var dirVector = new THREE.Vector3(0, 0, 1);
            dirVector.applyQuaternion(ship.quaternion);

            // Seitenvektoren bestimmen
            var matrix = new THREE.Matrix4();
            matrix.extractRotation( ship.matrix );
            var upVector = new THREE.Vector3( 0, 1, 0 );
            matrix.multiplyVector3( upVector );
            var leftVector = getOrthognalVector(dirVector, upVector);
            var rightVector = leftVector.clone().multiplyScalar(-1);

            // Relative Geschwindigkeit des Schiffes
            var relativeSpeed = (-yAxis-2)/maxVel;

            var startScale = 6-relativeSpeed*3;
            // Vector berechnen, auf dem sich der Partikelstrahl bewegen soll
            startVector = new THREE.Vector3(
                pos.x + startScale * dirVector.x,
                pos.y + startScale * dirVector.y,
                pos.z + startScale * dirVector.z
            );
            var endScale = 12;
            endVector = new THREE.Vector3(
                pos.x + endScale * dirVector.x,
                pos.y + endScale * dirVector.y,
                pos.z + endScale * dirVector.z
            );

            // Bewegung zur Seite anpassen
            if (moveLeft) {
                startVector.addScaledVector(leftVector, 2);
            } else if (moveRight) {
                startVector.addScaledVector(rightVector, 2);
            }

            // Partikel updaten
            createRay();
            particleRay.update();
        }

    };

};
