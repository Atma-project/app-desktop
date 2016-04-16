uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    float h = normalize(vWorldPosition + offset).y;
    vec4 color = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), 1.0);

    gl_FragColor = color;
}
