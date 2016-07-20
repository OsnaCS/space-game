var container;

var camera, scene, renderer, clock;

var fileLoader;
var interface;

$(function() {
    fileLoader = FileLoader();
    interface = Interface();

    init();
    animate();
});


function init() {

    /********** THREE.js initialisieren **********/

    container = document.createElement( 'div' );
    document.body.appendChild( container );





    scene = new THREE.Scene();
    // Beispiel-Code ...
    var player = Player();
    player.init();
    
    camera = new THREE.TargetCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );    
    camera.addTarget({
        name:'Target',
        targetObject: ship,
        cameraPosition: new THREE.Vector3(0,0,400),        
        fixed: false,
        stiffness: 0.1,
        matchRotation: false
    });

    camera.setTarget('Target');


  





    /********** Szene füllen **********/


    var light, object;

    scene.add( new THREE.AmbientLight( 0x404040 ) );
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 0 );
    scene.add( light );


    

    object = new THREE.AxisHelper( 100 );
    object.position.set( 0, 0, 0 );
    scene.add( object );

    var spaceShipModel = fileLoader.get("HeroShipV2");




    /********** Module laden **********/

    
    var world = World();
    world.init();
    var movement = Movement();
    movement.init();


   /** object = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 50 );
    object.position.set( 400, 0, -200 );
    scene.add( object ); */



    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );




    subHP (500); //HP Bar Beispiel



    /********** Input **********/
    
    // Szene in DOM einsetzen
    container.appendChild( renderer.domElement );
    // Event-Listener
    window.addEventListener( 'resize', onWindowResize, false );

    clock = new THREE.Clock();


    window.onkeydown = onKeyDown;



}

function onKeyDown(e) {
    if (e.keyCode == 80) { // = 'P'
        interface.toggleMenuOverlay();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {
    // dont touch!
    requestAnimationFrame( animate );
    render();
}


    camera.lookAt( scene.position );




function render() {

    // TODO: animation code goes here

    delta = clock.getDelta();
    Movement().move(delta);
    camera.update();
    renderer.render( scene, camera );

}
