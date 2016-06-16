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

void main() {

    vec3 newPosition = position;
    //newPosition.x = initial.x + cos(frame / (speedCoef / 2.0) + offset) * radius;
    // newPosition.y = initial.y + sin(frame / speedCoef + offset) * (radius / 2.0);
    // newPosition.z = initial.z + sin(frame / speedCoef + offset) * (radius / 2.0);
    //
    // newPosition.x = initial.x + cos(frame / (speedCoef * 5.0) + offset) * disform;
    // newPosition.y = initial.y + sin(frame / (speedCoef * 5.0) + offset) ;
    // newPosition.z = initial.z + offset;


    newPosition.x = initial.x + cos(frame / (speedCoef * 5.0) * offset) / disform;
    newPosition.y = initial.y - sin(frame / (speedCoef * 5.0) + offset) ;
    newPosition.z = initial.z + cos(frame / 10.0) + offset * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

   // vRotate = offset + cos(frame / (speedCoef * 2.0) + offset);

    gl_PointSize = size;

    //mvPosition = modelViewMatrix * vec4(newPosition.z, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
