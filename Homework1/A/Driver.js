// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18

let phong_vs = document.getElementById('phong-vs').textContent;
let phong_fs = document.getElementById('phong-fs').textContent;

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
