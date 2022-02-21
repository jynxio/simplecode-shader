import "/style/reset.css";

import "/style/index.css";

import * as three from "three";

import vertex_shader from "./shader/vertex_shader.glsl";

import fragment_shader from "./shader/fragment_shader.glsl";

/* ------------------------------------------------------------------------------------------------------ */
/* Renderer */
const renderer = new three.WebGLRenderer( { antialias: window.devicePixelRatio < 2 } );

renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.append( renderer.domElement );

/* Scene */
const scene = new three.Scene();

/* Camera */
const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    100,
);

scene.add( camera );

/* ------------------------------------------------------------------------------------------------------ */
/* Shader */
const geometry = new three.PlaneGeometry( 2, 2 );

const uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new three.Vector2( window.innerWidth, window.innerHeight ) },
};
const material = new three.ShaderMaterial( {
    uniforms,
    vertexShader: vertex_shader,
    fragmentShader: fragment_shader,
} );

const mesh = new three.Mesh( geometry, material );

scene.add( mesh );

/* Resize */
window.addEventListener( "resize", _ => {

    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
    renderer.setSize( window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    uniforms.u_resolution.value.set( window.innerWidth, window.innerHeight );

} );

/* Render */
const clock = new three.Clock();

renderer.setAnimationLoop( function loop() {

    uniforms.u_time.value += clock.getDelta();

    renderer.render( scene, camera );

} );
