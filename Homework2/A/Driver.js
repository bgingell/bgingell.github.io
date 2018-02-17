// Brent Gingell
// bgingell@ucsc.edu
// 2/17/18



function main(){

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.z = 5;

    scene = new THREE.Scene();

/****************** SKYBOX *******************************/

    let sb_vs = document.getElementById('skybox-vs').textContent;
    let sb_fs = document.getElementById('skybox-fs').textContent;

    let cubeMap = new THREE.CubeTextureLoader().load( [
        'posx.jpg',
        'negx.jpg',
        'posy.jpg',
        'negy.jpg',
        'posz.jpg',
        'negz.jpg'
    ] );

    let uniforms = { "tCube": { type: "t", value: cubeMap } };

    let material = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: sb_vs,
        fragmentShader: sb_fs
    } );

    material.depthWrite = false;
    material.side = THREE.BackSide;

    let geometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
    let skyMesh = new THREE.Mesh( geometry, material );
    scene.add( skyMesh );


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xAAAAAA);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    function animate(){
        requestAnimationFrame( animate );
        renderer.render(scene, camera);
    }
    animate();
}
