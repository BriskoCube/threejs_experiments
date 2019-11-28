import * as THREE from '//cdnjs.cloudflare.com/ajax/libs/three.js/109/three.module.js';


const fps = document.querySelector("#fps > span");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.lookAt(new THREE.Vector3(0, 0, 0))

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

var line = new THREE.Line( geometry, material );
scene.add( line );



camera.position.z = 20;


let lastTime = new Date().getTime();
let lastUpdate = new Date().getTime();


let rotationSpeed = 10 * 1000;
let zoom = 50;



var animate = function () {
    requestAnimationFrame( animate );

    let currentTime = new Date().getTime();
    let delta = currentTime - lastTime;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.1;

    material.color.setHex(Math.random() * 0xffffff)

    var geometry = new THREE.Geometry();
    for(let i = 0; i < 2; i++)
        geometry.vertices.push(new THREE.Vector3( Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10) );

    var line = new THREE.Line( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
    //var line = new THREE.Line( geometry, material );
    scene.add( line );

    renderer.render( scene, camera );


    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let rad = currentTime % rotationSpeed / rotationSpeed * Math.PI * 2;

    camera.position.x = Math.cos(rad) * Math.cos(currentTime/5000)*25;
    camera.position.z = Math.sin(rad) * Math.cos(currentTime/5000)*25;



    if(currentTime > lastUpdate + 500){
        fps.innerHTML = Math.floor(1000 / (delta));
        lastUpdate = currentTime;
    }
    lastTime = currentTime;


};

animate();