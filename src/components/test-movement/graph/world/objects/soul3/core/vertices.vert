uniform float frame;
uniform float noiseSmoothing;
uniform float noiseSpeed;
uniform float amplitude;
uniform float speedCoef;

attribute vec3 initial;
attribute float offset;

varying vec4 mvPosition;

const float PI = 3.14159265358979323846264;

void main() {

  vec3 newPosition = position;

  mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

  gl_PointSize = 200.0;

  gl_Position = projectionMatrix * mvPosition;
}
