
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
