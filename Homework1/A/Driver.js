// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18



function main(){

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, 0.1, 10);
    camera.position.z = 5;

    scene = new THREE.Scene();



    let mesh1, mesh2, mesh3;
    // a light is three vec3 in the order
    // position, diffuse, specular
    let lights = [];
    let phong_material = init_lights(lights);
    let geo_one = new THREE.SphereGeometry(1, 64, 64);
    let mat2 = new THREE.MeshPhongMaterial();
    mesh1 = new THREE.Mesh(geo_one, phong_material);
    scene.add(mesh1);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x999999);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();



}

function init_lights( lights){
    light1 = [];
    let l1_pos = new THREE.Vector3(0.0, 10.0, 0.0);
    let l1_diff = new THREE.Vector3(0.0, 0.0, 1.0);
    let l1_spec = new THREE.Vector3(1.0, 0.0, 0.0);
    light1.push(l1_pos); light1.push(l1_diff); light1.push(l1_spec);
    lights.push(light1);

    light2 = [];
    let l2_pos = new THREE.Vector3(10.0, 10.0, 0.0);
    let l2_diff = new THREE.Vector3(1.0, 1.0, 1.0);
    let l2_spec = new THREE.Vector3(0.0, 1.0, 0.0);
    light2.push(l2_pos); light2.push(l2_diff); light2.push(l2_spec);
    lights.push(light2);

    light3 = [];
    let l3_pos = new THREE.Vector3(0.0, -10.0, 0.0);
    let l3_diff = new THREE.Vector3(1.0, 0.0, 1.0);
    let l3_spec = new THREE.Vector3(1.0, 0.0, 0.0);
    light3.push(l3_pos); light3.push(l3_diff); light3.push(l3_spec);
    lights.push(light3);

    let ambient = new THREE.Vector3(0.1,0.1,0.1);
    var uniforms =  {
        ambient: { type: "v3", value: ambient },
        light1_pos: { type: "v3", value: lights[0][0]},
        light1_diffuse: { type: "v3", value: lights[0][1] },
        light1_specular:  { type: "v3", value: lights[0][2]},
        light2_pos: { type: "v3", value: lights[1][0]},
        light2_diffuse: { type: "v3", value: lights[1][1] },
        light2_specular:  { type: "v3", value: lights[1][2] },
        light3_pos:{ type: "v3", value: lights[2][0]},
        light3_diffuse:{type: "v3", value: lights[2][1]},
        light3_specular:{type: "v3", value:lights[2][2]},
    };


    let phong_material = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById('phong-vs').textContent,
        fragmentShader: document.getElementById('phong-fs').textContent,
    } );

    return phong_material;


}
