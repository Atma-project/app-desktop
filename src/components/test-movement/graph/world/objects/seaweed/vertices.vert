uniform float frame;
uniform float random;

uniform float seaweedHeight;
uniform float waveLength;
uniform float speed;
uniform float bendFactor;
uniform float offset;

varying vec2 vUv;

void main() {

  vUv = uv;

  float mult = - position.y / seaweedHeight * 2.0 - offset;
  float s = sin( ( frame + random * 10.0 ) * speed + mult * waveLength );
  float offset = pow( mult, 2.0 ) * s * ( bendFactor * random );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 );

  gl_Position = projectionMatrix * mvPosition;
}
