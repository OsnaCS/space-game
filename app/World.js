var stars = []; 

function updateStars(){


}


function createStars(){

    var star, material; 

    for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {

        //Material of stars
        material = new THREE.ParticleCanvasMaterial( { color: 0xffffff, program: particleRender } );
        // make the star
        star = new THREE.Particle(material);
        
        // give it a random x and y position between -500 and 500
        particle.position.x = Math.random() * 1000 - 500;
        particle.position.y = Math.random() * 1000 - 500;

        star.position.z = zpos; 
        star.scale.x = star.scale.y = 10;

        scene.add(star); 

        stars.push(star); 
    }

}
function World(){

    return {
        init: function() {
            var textureLoader = new THREE.TextureLoader();
            textureLoader.setCrossOrigin('anonymous');
            textureLoader.load('../res/textures/tex.jpg', function (texture) {
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

