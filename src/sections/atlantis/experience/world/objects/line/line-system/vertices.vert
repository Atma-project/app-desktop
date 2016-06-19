attribute vec3 initial;
attribute float offset;
attribute float alpha;

uniform float frame;
uniform float size;
uniform float speedCoef;
uniform float radius;
uniform float disform;

varying vec3 vNormal;
varying vec4 mvPosition;
varying float vRotate;

#define M_PI 3.1415926535897932384626433832795

void main() {

    vec3 newPosition = position;
    //newPosition.x = initial.x + cos(frame / (speedCoef / 2.0) + offset) * radius;
    // newPosition.y = initial.y + sin(frame / speedCoef + offset) * (radius / 2.0);
    // newPosition.z = initial.z + sin(frame / speedCoef + offset) * (radius / 2.0);
    //
    // newPosition.x = initial.x + cos(frame / (speedCoef * 5.0) + offset) * disform;
    // newPosition.y = initial.y + sin(frame / (speedCoef * 5.0) + offset) ;
    // newPosition.z = initial.z + offset;


    newPosition.x = initial.x + cos(10.2 / (speedCoef * 5.0) * offset + frame) / disform;
    newPosition.y = initial.y - cos(10.2 / (speedCoef * 5.0) + offset + frame);
    newPosition.z = initial.z + cos(10.2 / 10.0) + offset * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
}
