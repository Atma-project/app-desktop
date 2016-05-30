uniform float size;
uniform float frame;
uniform float speedCoef;

attribute vec3 initial;
attribute float offset;

varying vec3 vNormal;
varying vec4 mvPosition;
varying float vRotate;

void main() {

    vec3 newPosition = position;

    newPosition.x = initial.x + cos(frame / (speedCoef/2.0) + offset) * 3.0;
    newPosition.y = initial.y + sin(frame / (speedCoef/2.0) + offset);
    newPosition.z = initial.z + sin(frame / speedCoef + offset) * (1.5);

    mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vRotate = offset + cos(frame / (speedCoef * 2.0) + offset);

    gl_PointSize = 100.0;

    // mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
