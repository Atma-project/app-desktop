attribute vec3 initial;
attribute float offset;
attribute float alpha;
attribute vec3 pos;

uniform float time;
uniform float speedCoef;
uniform float frame;
uniform float radius;
uniform float size;
uniform float scale;
uniform float intensity;
uniform float hue;
uniform float saturation;
uniform float lightness;

varying vec3 vNormal;
varying vec4 mvPosition;
varying float vRotate;

void main() {

    vec3 newPosition = pos;

    newPosition.x = initial.x + cos(frame) + offset;
    newPosition.y = initial.y + sin(frame / speedCoef + offset) * (15.0);
    // newPosition.z = initial.z + sin(frame / speedCoef + offset) * (15.0);

    mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    float sizeAttenuation = size * (scale / length(mvPosition.xyz));

    vRotate = offset + cos(frame / (speedCoef * 2.0) + offset);

    gl_PointSize = 20.0; // alpha to vary point size

    // mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
