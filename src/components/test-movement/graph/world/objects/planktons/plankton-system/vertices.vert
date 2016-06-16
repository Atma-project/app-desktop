attribute vec3 initial;
attribute float offset;
attribute float alpha;

uniform float time;
uniform float frame;
uniform float size;
uniform vec3 speedCoef;
uniform float radius;

varying vec3 vNormal;
varying vec4 mvPosition;
varying float vRotate;

void main() {

    vec3 newPosition = position;
    // newPosition.x += speedCoef.x;
    // newPosition.y = initial.y + sin(frame / speedCoef + offset) * (radius / 2.0);
    // newPosition.z = initial.z + sin(frame / speedCoef + offset) * (radius / 2.0);
    //
    // newPosition.x = initial.x + cos(frame / (speedCoef * 5.0) + offset);
    // newPosition.y = initial.y + sin(frame / (speedCoef * 5.0) + offset);
    // newPosition.z = initial.z + sin(frame / (speedCoef * 5.0) + offset);

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

    gl_PointSize = size;

    // mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
