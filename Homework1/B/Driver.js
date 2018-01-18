// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18

let vertex_shader = document.getElementById('vertexShader').textContent;
let frag_shader = document.getElementById('fragmentShader').texContent;

function main(){

    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, 0.1, 10);
    camera.position.z = 5;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x999999);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


}
