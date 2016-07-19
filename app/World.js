var stars = []; 
var asteroids = []; 

//starStuff
function createStars(){

    var star, material; 

    for ( var zpos= -1000; zpos < 1000; zpos+=10 ) {

        // Material of stars
        material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var geometry = new THREE.SphereGeometry(1,32,32);
        // make the star
       
        star = new THREE.Mesh(geometry, material)

        // give it a random x and y position between -500 and 500
        star.position.x = Math.random() * (window.innerWidth + 1000) - 1000;
        star.position.y = Math.random() * (window.innerHeight + 1000) - 1000;

        star.position.z = zpos; 
        star.scale.x = star.scale.y = star.scale.z = Math.random() * 5 - 4;


        scene.add(star); 

        stars.push(star); 
    }

}

function updateStars(){

// iterate through every star
    for(var i=0; i<stars.length; i++) {
   
        star = stars[i]; 
 
        // and move it forward 
        star.position.z -=  0.3;
 
        // if the star is too close move it to the back
        if(star.position.z<0) star.position.z+=1000; 
}

}


//AsteroidStuff

function createAsteroids(){

 var  materialAst; 
    var loader = new THREE.JSONLoader();
    var ast1, ast2, ast3;
    
    var randPositionX, randPositionY, randScale; 

    for ( var zposA= -1000; zposA < 1000; zposA+=20 ) {

        randScale = Math.random() * 50 - 40; 
        randPositionX = Math.random() * (window.innerWidth + 1000) - 1000;
        randPositionY = Math.random() * (window.innerHeight + 1000) - 1000;
        loader.load("../res/models/AsteroidPart1.json", function(geometry) {

        ast1 = new THREE.Mesh (geometry, new THREE.MeshPhongMaterial());
        ast1.position.x = randPositionX;
        ast1.position.y = randPositionY;

        ast1.position.z = zposA; 
        ast1.scale.x = ast1.scale.y = ast1.scale.z = randScale;

        scene.add(ast1); 

        asteroids.push(ast1);
    });
        
        
        loader.load("../res/models/AsteroidPart2.json", function(geometry) {

        ast2 = new THREE.Mesh (geometry, new THREE.MeshPhongMaterial());
        ast2.position.x = randPositionX;
        ast2.position.x = randPositionY;
        ast2.position.z = zposA;
        ast2.scale.x = ast2.scale.y = ast2.scale.z = randScale;
        scene.add(ast2); 

        asteroids.push(ast2);
    });

      

        loader.load("../res/models/AsteroidPart3.json", function(geometry) {

        ast3 = new THREE.Mesh (geometry, new THREE.MeshPhongMaterial());
        ast3.position.x = randPositionX;
        ast3.position.x = randPositionY;
        ast3.position.z = zposA;
        ast3.scale.x = ast3.scale.y = ast3.scale.z = randScale;

        scene.add(ast3); 

        asteroids.push(ast3); 

    });

       

    

        

    }

   
}

function updateAsteroids(){

// iterate through every particle
    for(var k=0; k<asteroid.length; k++) {
   
        asteroid = asteroids[k]; 
 
        // and move it forward dependent on the mouseY position. 
        asteroid.position.z +=  0.1;
 
        // if the particle is too close move it to the back
        if(asteroid.position.z>500) asteroid.position.z-=1000; 
}

}

function World(){

    return {
        init: function() {
            var textureLoader = new THREE.TextureLoader();
            textureLoader.setCrossOrigin('anonymous');
            textureLoader.load('../res/textures/texe.jpg', function (texture) {
                var geometry = new THREE.SphereGeometry(500, 20, 20);

                var material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                });

                sphere = new THREE.Mesh(geometry, material);

                sphere.position.set(0, 0, 0);
                scene.add(sphere);
            });
        }
}
}

