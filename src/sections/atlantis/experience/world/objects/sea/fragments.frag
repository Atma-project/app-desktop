uniform sampler2D tDis;
uniform float disScale;
uniform float disBias;
uniform float disPostScale;
uniform float time;

varying vec2 vUv;
varying float vTime;

float random(vec2 n, float offset ){
	// return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453);
	return .5 - fract(sin(dot(n.xy + vec2( offset, 0. ), vec2(12.9898, 78.233)))* 43758.5453);
}

void main() {

    vec4 diffuseTex  = texture2D( tDis, vUv ) + vec4( vec3( 0.05 * random( vUv, vTime ) ) , 1.0 );

    gl_FragColor = vec4( 1.0 - vec3( diffuseTex.r ), 1.0 );
}
