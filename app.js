
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.sortObjects = false; //make it so that atmospheres don't occlude the planet inside
// renderer.setClearColor( 0x111111, 1 ); //DEBUG ONLY. Should be black in general

document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});













//set up scene, camera, and camera controls
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100000000 );
camera.position.z = 800;
var controls = new THREE.OrbitControls( camera )
controls.update();







// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'Pale_Blue_Dot.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(false);
	sound.setVolume(0.5);
	sound.play();
});








//set up geometry in scene
mesh_types = ['atmo', 'surf', 'cloud', 'ring'];



// var sphere_geometry = new THREE.SphereBufferGeometry( 5, 64, 64 );
var scale = 1/5000;

//Sun
planets.sun.surf = new THREE.Mesh(
	new THREE.SphereBufferGeometry( planets.sun.diameter  * scale, 64, 64),
	new THREE.MeshBasicMaterial( { color: 0xFFFFFF } )
);
planets.sun.atmo = new THREE.Mesh(
	new THREE.SphereBufferGeometry( planets.sun.diameter * scale * 1.01, 64, 64),
	new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/2k_sun.jpg'), transparent: true, opacity: .5 } )
);

//Mercury
planets.mercury.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.mercury.diameter * scale, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_mercury.jpg') } ) 
);

//Venus
planets.venus.surf = new THREE.Mesh(
	new THREE.SphereBufferGeometry( planets.venus.diameter * scale, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_venus_surface.jpg') } )
);
planets.venus.atmo = new THREE.Mesh(
	new THREE.SphereBufferGeometry( planets.venus.diameter * scale * 1.01, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_venus_atmosphere.jpg'), transparent: true, opacity: 0.95 } )
);

//Earth
planets.earth.surf = new THREE.Mesh(
	//new THREE.SphereBufferGeometry( 4.99, 64, 64),
	new THREE.SphereBufferGeometry( planets.earth.diameter * scale, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_earth_w_clouds.jpg') } )
);
planets.earth.atmo = new THREE.Mesh(
	//new THREE.SphereBufferGeometry( 4.995, 64, 64),
	new THREE.SphereBufferGeometry( planets.earth.diameter * scale * 1.0001, 64, 64),
	new THREE.MeshLambertMaterial( { color: 0x000080, transparent: true, opacity: 0.2 } )
);
planets.earth.cloud = new THREE.Mesh(
	new THREE.SphereBufferGeometry( planets.earth.diameter * scale * 1.0002, 64, 64),
	//sphere_geometry,
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_earth_clouds_trans.png'), transparent: true, opacity: 1.0 } )
);

//Moon
planets.moon.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.moon.diameter * scale, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_moon.jpg') } ) 
);

//Mars
planets.mars.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.mars.diameter * scale, 64, 64), 
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_mars.jpg') } ) 
);

//Jupiter
planets.jupiter.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.jupiter.diameter * scale, 64, 64), 
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_jupiter.jpg') } ) 
);

//Saturn
planets.saturn.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.saturn.diameter * scale, 64, 64), 
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_saturn.jpg') } )
);
planets.saturn.ring = new THREE.Mesh(
	//new THREE.RingBufferGeometry( 5.5804, 11.6335, 64),
	new THREE.SphereBufferGeometry( planets.saturn.ring_inner_diameter * scale, planets.saturn.ring_outer_diamerter * scale, 64, 64),
	new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/saturn_rings_round.png'), transparent: true, opacity: 1.0, side: THREE.DoubleSide } ) //'textures/2k_saturn_ring_alpha.png'
);

//Uranus
planets.uranus.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.uranus.diameter * scale, 64, 64),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_uranus.jpg') } ) 
);

//Neptune
planets.neptune.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.neptune.diameter * scale, 64, 64), 
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/2k_neptune.jpg') } ) 
);

//Pluto
planets.pluto.surf = new THREE.Mesh( 
	new THREE.SphereBufferGeometry( planets.pluto.diameter * scale, 64, 64), 
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('textures/4k_pluto.jpg') } ) 
);

//adjust saturn's rings orientation
planets.saturn.ring.rotation.x = Math.PI / 2;

var planets_arr = [planets.sun, planets.mercury, planets.venus, planets.earth, planets.moon, planets.mars, planets.jupiter, planets.saturn, planets.uranus, planets.neptune, planets.pluto];
var planets_ind = 0;


// planets.sun.parent = null;
// planets.sun.children = [planets.mercury, planets.venus, planets.earth, planets.mars, planets.jupiter, planets.saturn, planets.uranus, planets.neptune, planets.pluto];
// planets.mercury.parent = planets.sun;
// planets.mercury.children = [];
// planets.venus.parent = planets.sun;
// planets.venus.children = [];
// planets.earth.parent = planets.sun;
// planets.earth.children = [planets.moon];
// planets.mars.parent = planets.sun;
// planets.mars.children = [];
// planets.jupiter.parent = planets.sun;
// planets.jupiter.children = [];
// planets.saturn.parent = planets.sun;
// planets.saturn.children = [];
// planets.neptune.parent = planets.sun;
// planets.neptune.children = [];
// planets.pluto.parent = planets.sun;
// planets.pluto.children = [];



for (i in planets_arr.slice(1, planets_arr.length))
{
	planet = planets_arr[i];
	//apply initial axial tilt
	for (key in mesh_types)
	{	if (planet.hasOwnProperty(mesh_types[key]))
		{
			//planet[mesh_types[key]].setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad(planet.axial_tilt));
			planet[mesh_types[key]].matrixAutoUpdate = false;
		}
	}
}


// //add planets to the scene
// scene.add(planets.sun.atmo);
// scene.add(planets.sun.surf);
// scene.add(planets.mercury.surf);
// scene.add(planets.venus.surf);
// scene.add(planets.venus.atmo);
// scene.add(planets.earth.surf);
// scene.add(planets.earth.atmo);
// scene.add(planets.earth.cloud);
// scene.add(planets.moon.surf);
// scene.add(planets.mars.surf);
// scene.add(planets.jupiter.surf);
// scene.add(planets.saturn.surf);
// scene.add(planets.saturn.ring);
// scene.add(planets.uranus.surf);
// scene.add(planets.neptune.surf);
// scene.add(planets.pluto.surf);



//function to set a planet to invisible
function set_visibility(mesh, visible, init=false)
{
	for (key in mesh_types)
	{
		if (mesh_types[key] in mesh)
		{
			mesh[mesh_types[key]].visible = visible;
			if (init) { scene.add(mesh[mesh_types[key]]); }
		} 
	}
	// camera.position.z = mesh.surf.geometry.parameters.radius * 3;
}

//nice generic case to be fixed later
function set_param(mesh, params, value=null, func=null)
{
	if (params[0] in mesh)	//only operate if the parameter exists
	{
		if (params.length == 1)
		{
			//base case
			if (value != null) { mesh[params[0]] = value };
			if (func != null) { func(mesh[params[0]]); }
		}
		else
		{
			//recursive case
			set_param(mesh[params[0]], params.slice(1, params.length), value);
		}
	}
}



//add all of the planets to the scene
//set all as invisible
for (var planet in planets)
{
	set_visibility(planets[planet], visible=false, init=true);
	// for (type in ['surf', 'atmo', 'cloud', 'ring'])
	// {
	// 	//set_param(planets[planet], [type], func=function(x){ scene.add(x); });
	// 	set_param(planets[planet], [type, 'visible'], value=false);

	// }
	// set_visibility(planets[planet], visible=true, init=true);
	// set_param(planets[planet], ['atmo', 'visible'], false);
	// set_param(planets[planet], ['surf', 'visible'], false);
	// set_param(planets[planet], ['cloud', 'visible'], false);
	// set_param(planets[planet], ['ring', 'visible'], false);
}





function change_planet(delta)
{
	//mark the current object as invisible
	set_visibility(planets_arr[planets_ind], false);

	if (delta == 0)
	{
		//reset to original
		planets_ind = 0;
	}
	else
	{
		planets_ind += delta;
		if (planets_ind < 0) { planets_ind = planets_arr.length - 1; }
		planets_ind %= planets_arr.length;
	}

	//mark the new object as visible
	set_visibility(planets_arr[planets_ind], true);

}
//reset to 0 at start of program
change_planet(3);
camera.position.z = 50;






//make a skybox to hold the milky way image. Alternative is to have black background
var skybox = new THREE.Mesh(
	new THREE.CubeGeometry(100000000, 100000000, 100000000),
	[																						//DeepStarMap
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayXP.jpg'), side: THREE.DoubleSide } ),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayXN.jpg'), side: THREE.DoubleSide } ),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayYP.jpg'), side: THREE.DoubleSide } ),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayYN.jpg'), side: THREE.DoubleSide } ),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayZP.jpg'), side: THREE.DoubleSide } ),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('textures/skyboxes/MilkyWayZN.jpg'), side: THREE.DoubleSide } ),
	]
);
scene.add( skybox );




// //set up lighting in scene
// var ambient_light = new THREE.AmbientLight( 0xFFFFFF, 0.025);
// scene.add(ambient_light);

var direction_light = new THREE.DirectionalLight(0xFFFFFF, 1);
direction_light.position.set(1, 0, 0);
direction_light.castShadow = true;
scene.add(direction_light)



//handle the moving planets logic
function update_scene(t)
{
	//for each planet index
	for (key in planets_arr)
	{
		planet = planets_arr[key]
		//compute location, rotation for this planet
		var pos = null;
		if (planet.hasOwnProperty('a0')) 
		{	pos = get_pos(planet, t);}
		else {	pos = [0, 0, 0]; }
		var x = pos[0] * 100; var y = pos[1] * 100; var z = pos[2] * 100;
		var rot = get_rot(planet, t);

		var spin = new THREE.Matrix4();
		spin.makeRotationY(THREE.Math.degToRad(rot));
		var tilt = new THREE.Matrix4();
		tilt.makeRotationZ(THREE.Math.degToRad(planet.axial_tilt));
		var disp = new THREE.Matrix4();
		disp.makeTranslation(y,z,x);


		var transform = new THREE.Matrix4();
		transform.premultiply(spin);
		transform.premultiply(tilt);
		transform.premultiply(disp);

		//apply location, rotation for this planet's meshes
		for (i in mesh_types)
		{
			if (mesh_types[i] in planet)
			{
				planet[mesh_types[i]].matrix = transform;
			}
		}
	}
}


// function update_planets(t, planet, transform, ancestor)
// {
// 	//update the positions of all planets from the current planet
// 	//update all parents with inverse world transform of root, and all children with their world transform times root world transform
// 	for ()
// }

function transform_all(tf)
{
	//for all planets, already transformed at the timestep,
	//apply the inverse transform of the currently focused planet
	for (key in planets_arr)
	{
		planet = planets_arr[key];
		for (i in mesh_types)
		{
			if (mesh_types[i] in planet)
			{
				transform = planet[mesh_types[i]].matrix;
				transform.premultiply(tf);
				planet[mesh_types[i]].matrix = transform;
			}
		}
	}
}

//create a time object for keeping track of scene time
var time = new Date( 2000, 0, 1, 12, 0, 0 ).getTime(); //current epoch in milliseconds
var step = 10000000;


document.addEventListener('keydown', function(event)
{
	if (event.keyCode == 68)
	{
		//[right] moves to next planet
		change_planet(1);
	}
	else if (event.keyCode == 65)
	{
		//[left] moves to previous planet
		change_planet(-1);
	}
	else if (event.keyCode == 27)
	{
		//[escape] returns to the original planet
		change_planet(0);
	}
	else if (event.keyCode == 87)
	{
		step *= 2;
	}
	else if (event.keyCode == 83)
	{
		step /= 2;
	}
});



function animate()
{	
	requestAnimationFrame( animate );

	time += step;

	//for each planet index
	for (key in planets_arr)
	{
		planet = planets_arr[key]
		var rot = get_rot(planet, time);

		var spin = new THREE.Matrix4();
		spin.makeRotationY(THREE.Math.degToRad(rot));
		var tilt = new THREE.Matrix4();
		tilt.makeRotationZ(THREE.Math.degToRad(planet.axial_tilt));

		var transform = new THREE.Matrix4();
		transform.premultiply(spin);
		transform.premultiply(tilt);

		//apply location, rotation for this planet's meshes
		for (i in mesh_types)
		{
			if (mesh_types[i] in planet)
			{
				planet[mesh_types[i]].matrix = transform;
			}
		}
	}

	//slowly move the camera around
	// transform = new THREE.Matrix4();
	// rot1 = new THREE.Matrix4();
	// rot1.makeRotationX(0.01);
	// rot2 = new THREE.Matrix4();
	// rot2.makeRotationY(0.002);
	// transform.premultiply(rot1);
	// transform.premultiply(rot2);
	// camera.matrix = transform;


	renderer.render( scene, camera );
}
animate();

// function animate() {
// 	requestAnimationFrame( animate );

// 	time += step; //update timestep
// 	update_scene(time);
// 	// transform = planets_arr[planets_ind].surf.matrix;
// 	// var disp_vec = new THREE.Vector3();
// 	// disp_vec.setFromMatrixPosition( transform );
// 	// disp_vec.negate();
// 	// disp_mat = new THREE.Matrix4();
// 	// disp_mat.setPosition(disp_vec);
// 	// transform_all(disp_mat);
// 	// console.log(time);

// 	// console.log(planets.earth.surf.rotation.y);
// 	get_rot(null, time, true);

// 	renderer.render( scene, camera );
// }
// animate();