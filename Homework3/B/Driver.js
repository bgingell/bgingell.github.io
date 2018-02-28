// Brent Gingell
// bgingell@ucsc.edu
// 3/4/18



function main(){
    var vs = document.getElementById( 'vertexShader' ).textContent;
    var fs = document.getElementById( 'fragmentShader' ).textContent;

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, .01, 2000);
    camera.position.z = 5;

    scene = new THREE.Scene();

    let controls = new THREE.OrbitControls( camera );
    controls.update();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xAAAAAA);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    let plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight )
    let uniforms =  {
		u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
	};
	let material = new THREE.RawShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vs,
		fragmentShader: fs,
	} );
    scene.add(new THREE.Mesh(plane, material));

    function animate(){
        requestAnimationFrame( animate );
        renderer.render(scene, camera);
    }
    animate();
}
