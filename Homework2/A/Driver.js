// Brent Gingell
// bgingell@ucsc.edu
// 2/17/18



function main(){

    let container = document.getElementById('container');
    let camera, scene, renderer;

    camera = new THREE.PerspectiveCamera(50.0,
                    window.innerWidth/window.innerHeight, .01, 2000);
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(20, 50, 0))

    scene = new THREE.Scene();

    let controls = new THREE.OrbitControls( camera );
    controls.update();

    let gui = new dat.GUI( {width: 350 } );

    let options = { displacement: 23.8 };
    gui.add(options, "displacement", 0.0, 100.0);

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

    /*********** TERRAIN ************************/
    let plane = new THREE.PlaneGeometry(2000, 2000, 500, 500);
    let texture1 = new THREE.TextureLoader().load('heightmap.png');
    let texture2 = new THREE.TextureLoader().load('dirt.jpg');
    let texture3 = new THREE.TextureLoader().load('grass.jpg');
    let texture4 = new THREE.TextureLoader().load('rock.jpg');

    let uniforms2 = {
       displaceAmt: {type: "f", value: 0.0},
        tPic: { type: "t", value: texture1  },
        tDirt: { type: "t", value: texture2  },
        tGrass: { type: "t", value: texture3  },
        tRock: { type: "t", value: texture4  },
    }

    let material2 = new THREE.RawShaderMaterial({
        uniforms: uniforms2,
        vertexShader: document.getElementById("terr-vs").textContent,
        fragmentShader: document.getElementById("terr-fs").textContent
    })

    let plane_mesh = new THREE.Mesh(plane, material2);
    plane_mesh.material.side = THREE.DoubleSide;
    plane_mesh.rotateX(-Math.PI/2);
    plane_mesh.position.y = -30;
    scene.add(plane_mesh);

/******************* WATER ***************/
    let water_plane = new THREE.PlaneGeometry(2000, 2000, 500, 500);
    let uniforms3 = {
        tCube: {type: "t", value: cubeMap}
    }
    let material3 = new THREE.RawShaderMaterial({
        uniforms: uniforms3,
        vertexShader: document.getElementById("water-vs").textContent,
        fragmentShader: document.getElementById("water-fs").textContent
    })

    let water_mesh = new THREE.Mesh(water_plane, material3);
    water_mesh.material.side = THREE.DoubleSide;
    water_mesh.rotateX(-Math.PI/2);
    water_mesh.position.y = -32;
    scene.add(water_mesh);



    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xAAAAAA);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    function animate(){
        requestAnimationFrame( animate );
        plane_mesh.material.uniforms.displaceAmt.value = options.displacement;
        renderer.render(scene, camera);
    }
    animate();
}
