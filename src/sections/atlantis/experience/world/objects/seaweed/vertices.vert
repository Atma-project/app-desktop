uniform float frame;
uniform float random;

uniform float seaweedHeight;
uniform float waveLength;
uniform float speed;
uniform float bendFactor;
uniform float ooffset;

varying vec2 vUv;

void main() {

  vUv = uv;

  // float mult = - position.y / seaweedHeight * 2.0 - ooffset;
  // float s = sin(frame / 2.0 + random ) / 1000.0 * mult;
  // // float s = sin( ( frame + random ) * speed + mult * waveLength );
  // // float s = sin(  frame + random * 10.0 ) * speed + mult * waveLength;
  // float offset = pow( mult, 2.0 ) * s * ( bendFactor + random / 1000.0 );
  //
  // vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 );
  //
  float mult = - position.y / seaweedHeight * 2.0 - ooffset;
  float s = sin( ( frame + random * 10.0 ) * speed + mult * waveLength );
  float offset = pow( mult, 2.0 ) * s * ( bendFactor * random );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 );

  gl_Position = projectionMatrix * mvPosition;
}
