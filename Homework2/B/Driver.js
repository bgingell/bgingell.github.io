var camera, tick = 0,
    scene, renderer, clock = new THREE.Clock(),
    controls, container, gui = new dat.GUI( { width: 350 } ),
    options, spawnerOptions, particleSystem;

init();
animate();

function init() {

    //

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;

    scene = new THREE.Scene();

    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.	Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene

    particleSystem = new THREE.GPUParticleSystem( {
        maxParticles: 250000
    } );

    scene.add( particleSystem );

    // options passed during each spawned
    options = {
        position: new THREE.Vector3(-5.0,0.0,0.0),
        positionRandomness: .3,
        velocity: new THREE.Vector3(0.0, 1.0, 0.0),
        velocityRandomness: .11,
        color: 0xaaaaaa,
        colorRandomness: .2,
        turbulence: .5,
        lifetime: 2,
        size: 5,
        sizeRandomness: 1
    };

    spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 1.5,
        verticalSpeed: 1.33,
        timeScale: 1
    };

    //

    gui.add( options, "velocityRandomness", 0, 3 );
    gui.add( options, "positionRandomness", 0, 3 );
    gui.add( options, "size", 40, 80 );
    gui.add( options, "sizeRandomness", 0, 25 );
    gui.add( options, "colorRandomness", 0, 1 );
    gui.add( options, "lifetime", .1, 10 );
    gui.add( options, "turbulence", 0, 1 );

    gui.add( spawnerOptions, "spawnRate", 10, 30000 );
    gui.add( spawnerOptions, "timeScale", -1, 1 );

    particleSystem.spawnParticle( options );

    var geometry1 = new THREE.SphereGeometry( 1, 200, 200 );
    var uniforms1 =  {
		in_val:  { type: "f", value: 0.0 },
		displaceAmt: { type: "f", value: 0.0 },
	};
    var vs = document.getElementById( 'vertexShader' ).textContent;
    var fs = document.getElementById( 'fragmentShader' ).textContent;

    var material1 = new THREE.RawShaderMaterial( {
        uniforms: uniforms1,
        vertexShader: vs,
        fragmentShader: fs,
    } );
    var mesh1 = new THREE.Mesh( geometry1, material1 );
	mesh1.translateX(-1.0);
    scene.add( mesh1 );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 2.2;
    controls.panSpeed = 1;
    controls.dynamicDampingFactor = 0.3;

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    var delta = clock.getDelta() * spawnerOptions.timeScale;

    tick += delta;

    if ( tick < 0 ) tick = 0;

    if ( delta > 0 ) {
        for ( var x = 0; x < spawnerOptions.spawnRate * delta; x++ ) {
            particleSystem.spawnParticle( options );
        }

    }

    particleSystem.update( tick );

    render(tick);

}

function render(tick) {
    var object0 = scene.children[ 1 ];
//		object0.rotation.x = time * 0.0009;
//		object0.rotation.y = time * 0.0005;
    object0.material.uniforms.in_val.value += 0.01;
    object0.material.uniforms.displaceAmt.value = 2.0 * Math.sin(tick); //0.01;
    renderer.render( scene, camera );

}
