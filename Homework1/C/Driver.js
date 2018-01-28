// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18
// game of life with pingponging
let vertex_shader = document.getElementById('vertexShader').textContent;
let frag_shader = document.getElementById('fragmentShader').textContent;
let resX = 300;
let resY = 300;

function main(){

    let camera, scene, renderer;


    let width = window.innerWidth;
	let height = window.innerHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000);

	let gol_camera = new THREE.OrthographicCamera( width / -2, width / 2,
                                                                        height / 2, height / -2, 0.1, 1000 );
	gol_camera.position.z = 0.2;
    let golBufferObj = new THREE.WebGLRenderTarget(width, height);
    let gol_scene = new THREE.Scene();

    let bufferScene = new THREE.Scene();
    let FBO_A = new THREE.WebGLRenderTarget( resX, resY, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
    let FBO_B = new THREE.WebGLRenderTarget( resX, resY, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
    let dataTexture = createDataTexture();
    let bufferMat = new THREE.RawShaderMaterial({
        uniforms:{
            bufferTexture: {type: "t", value: dataTexture},
            textureSize: {type:"v2", value: new THREE.Vector2(resX, resY)}
        },
        vertexShader: vertex_shader,
        fragmentShader: frag_shader,
    });
    plane = new THREE.PlaneBufferGeometry(width, height);
    bufferObject = new THREE.Mesh(plane, bufferMat);
    bufferScene.add(bufferObject);

    fullScreenQuad = new THREE.Mesh(plane, new THREE.MeshBasicMaterial());
    gol_scene.add(fullScreenQuad);


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x999999);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let boxMat = new THREE.MeshBasicMaterial({map:golBufferObj.texture});
    let boxGeo = new THREE.BoxGeometry(5, 5, 5);
    let boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.z = -10;

    scene.add(boxMesh);

    function render(){
        requestAnimationFrame(render);
        renderer.render(bufferScene, gol_camera, FBO_B);
        fullScreenQuad.material.map = FBO_B.texture;

        renderer.setClearColor(0xCCCCCC);
        renderer.render(gol_scene, gol_camera, golBufferObj);
        renderer.setClearColor(0x666666);
        renderer.render(scene, camera);
        boxMesh.rotation.x += 0.01;
        let temp = FBO_A;
        FBO_A = FBO_B;
        FBO_B = temp;
        bufferMat.uniforms.bufferTexture.value = FBO_A.texture;
    }
    render();
}

function createDataTexture() {
	// create a buffer with color data
	let size = resX * resY;
	let data = new Uint8Array( 4 * size );
	for ( let i = 0; i < size; i++ ) {
		let stride = i * 4;
		if (Math.random() < 0.5) {
			data[ stride ] = 255;
			data[ stride + 1 ] = 255;
			data[ stride + 2 ] = 255;
			data[ stride + 3 ] = 255;
		} else {
			data[ stride ] = 0;
			data[ stride + 1 ] = 0;
			data[ stride + 2 ] = 0;
			data[ stride + 3 ] = 255;
		}
	}
	// used the buffer to create a DataTexture
	let texture = new THREE.DataTexture( data, resX, resY, THREE.RGBAFormat );
	texture.needsUpdate = true; // just a weird thing that Three.js wants you to do after you set the data for the texture
	return texture;

}
