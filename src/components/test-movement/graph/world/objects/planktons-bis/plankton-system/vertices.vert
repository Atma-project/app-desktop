attribute vec3 initial;
attribute float offset;
attribute float size;

uniform float time;
uniform float frame;
uniform float speedCoef;
uniform float radius;

varying vec3 vNormal;
varying vec4 mvPosition;

void main() {

    vec3 newPosition = position;

    // newPosition.x = initial.x + cos(frame / speedCoef + offset);
    // newPosition.y = initial.y + sin(frame / speedCoef + offset);

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

    gl_PointSize = size;

    // mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
