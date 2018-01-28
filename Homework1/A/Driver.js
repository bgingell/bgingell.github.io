// Brent Gingell
// bgingell@ucsc.edu
// 1/17/18



function main(){

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    scene = new THREE.Scene();



    let mesh1, mesh2, mesh3;
    // a light is three vec3 in the order
    // position, diffuse, specular
    let lights = [];
    let lightdirs = [1, 1, 1];
    let phong_material = init_lights(lights);

    let geo_one = new THREE.SphereGeometry(1, 64, 64);
    mesh1 = new THREE.Mesh(geo_one, phong_material);
    mesh1.position.x -= 3;
    scene.add(mesh1);
    let size_changer = 0.0;
    let go_bigger = true;
    let ch_size = [size_changer,go_bigger]
    let uni2 = {
        size_changer: {type:"f", value:ch_size[0]},
    }
    let two_material = new THREE.RawShaderMaterial( {
        uniforms: uni2,
        vertexShader: document.getElementById('two-vs').textContent,
        fragmentShader: document.getElementById('two-fs').textContent,
    } );
    let geo_two = new THREE.OctahedronGeometry()
    mesh2 = new THREE.Mesh(geo_two, two_material);
    scene.add(mesh2);

    // loading in a GolfCart
    var loader = new THREE.OBJLoader(  );
    let GolfCart;
    /* This is the work of Emil Persson, aka Humus.
    http://www.humus.name */
	loader.load( 'GolfCart.obj', function ( object ) {

		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material = two_material;
			}
		} );

		var s = 0.2;
		object.scale.set( s, s, s );
		object.position.x += 8.0;
		object.position.y += 2.5;
        object.position.z -= 8;
        object.rotation.z -= 90;

		GolfCart = object;
		scene.add( GolfCart );
	} );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x999999);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    function animate() {
        requestAnimationFrame( animate );
        move_lights(lights, lightdirs);
        change_size(ch_size);
        mesh2.rotation.z += 0.004;
        mesh2.rotation.x += 0.004;
        mesh1.position.z -= 0.025;
        GolfCart.rotation.y += 0.004;
        renderer.render( scene, camera );
    }
    animate();
}

function change_size(ch_size){
    if(ch_size[1]){
        ch_size[0] += 50;
        if(ch_size[0] >= 5000) ch_size[1] = false;
    } else {
        ch_size[0] -= 50;
        if(ch_size[0] <= 0) ch_size[1] = true;
    }
}
function move_lights(lights, lightdirs){
    if(lightdirs[0] == 1){
        lights[0][0].x += 0.25;
        if(lights[0][0].x >= 10) lightdirs[0] = 0;
    } else {
        lights[0][0].x -= 0.25;
        if(lights[0][0].x <= -10) lightdirs[0] = 1;
    }
    if(lightdirs[1] == 1){
        lights[1][0].y += 0.25;
        if(lights[1][0].y >= 10) lightdirs[1] = 0;
    } else {
        lights[1][0].y -= 0.25;
        if(lights[1][0].y <= -10) lightdirs[1] = 1;
    }
    if(lightdirs[2] == 1){
        lights[2][0].z += 0.25;
        if(lights[2][0].z>= 10) lightdirs[2] = 0;
    } else {
        lights[2][0].z -= 0.25;
        if(lights[2][0].z <= -10) lightdirs[2] = 1;
    }
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
    let tex = new THREE.TextureLoader().load('sky_cloud.jpg');
    let ambient = new THREE.Vector3(0.1,0.1,0.1);
    var uniforms =  {
        tex: {type: "t", value: tex},
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
