// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18

let vs = document.getElementById('vertexShader').textContent;
let fs = document.getElementById('fragmentShader').textContent;

let camera, scene, renderer, mesh;
let mouseX = 0.0;
let mouseY = 0.0;

function main(){

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, 0.1, 10);
    camera.position.z = 5;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x999999);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let pic = new THREE.TextureLoader().load('desktop.jpg');

    let geometry = new THREE.BufferGeometry();
	let vertices = new Float32Array( [
		-2.0, -1.5, 0.0,
		+2.0, -1.5, 0.0,
		+2.0, +1.5, 0.0,

		-2.0, -1.5, 0.0,
		+2.0, +1.5, 0.0,
		-2.0, +1.5, 0.0,

	] );

	let texCoords = new Float32Array( [
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,

		0.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
	] );

	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'texCoords', new THREE.BufferAttribute( texCoords, 2 ) );

	let uniforms = {
		tex: { type: "t", value: pic  },
		rx: {type: "f", value: 1024/2},
		ry: {type: "f", value: 1024/2},
		mixVal: {type: "f", value: 0.5},
	};

    let material = new THREE.RawShaderMaterial( {
		uniforms: uniforms,
    	vertexShader: vs,
		fragmentShader: fs,
	} );
    mesh = new THREE.Mesh( geometry, material);
	mesh.translateX(0.0);
	mesh.material.side = THREE.DoubleSide; //to render both sides of triangle
    scene.add( mesh );
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouseX = (event.clientX / window.innerWidth) ;
    mouseY = -(event.clientY / window.innerHeight) ;
}
function animate(){
    requestAnimationFrame(animate);
    mesh.material.uniforms.mixVal.value = mouseX;
    renderer.render( scene, camera );
}
animate();
