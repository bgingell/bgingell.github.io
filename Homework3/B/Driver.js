// Brent Gingell
// bgingell@ucsc.edu
// 3/4/18



function main(){
    var vs = document.getElementById( 'vertexShader' ).textContent;
    var fs = document.getElementById( 'fragmentShader' ).textContent;

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(45.0,
                    window.innerWidth/window.innerHeight, .1, 1000);
    camera.position.z = 5;

    scene = new THREE.Scene();

    let controls = new THREE.OrbitControls( camera );
    controls.update();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xAAAAAA);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    let light_pos = new THREE.Vector3(10.0, 10.0, 10.0);
    let light_diff = new THREE.Vector3(1.0,1.0,0.0);
    let light_spec = new THREE.Vector3(1.0,1.0,1.0);
    let rote = 1.0;
    let plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight )
    let uniforms =  {
		u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        light_pos: {type: "v3", value: light_pos },
        light_diff: {type: "v3", value: light_diff },
        light_spec: {type: "v3", value: light_spec },
        rote: {type:"f", value: rote}
	};
	let material = new THREE.RawShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vs,
		fragmentShader: fs,
	} );
    scene.add(new THREE.Mesh(plane, material));

    function animate(){
        requestAnimationFrame( animate );
        rote = rote + 0.2;
        scene.children[0].material.uniforms.rote.value = rote;
        renderer.render(scene, camera);
    }
    animate();
}
