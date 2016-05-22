uniform sampler2D tDis;
uniform float disScale;
uniform float disBias;
uniform float disPostScale;
uniform float time;

varying vec2 vUv;
varying float vTime;

void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    vTime = time;
    vUv = uv;

    vec3 dv                 = texture2D( tDis, vUv ).xyz;
    float df                = disScale * dv.x + disBias;

    vec4 displacedPosition  = vec4( normalize( normalMatrix * normal ).xyz * df * disPostScale/100.0, 0.0 ) + mvPosition;

    gl_Position             = projectionMatrix * displacedPosition;
}
