uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {

    float h = normalize(vWorldPosition + offset).y;
    // vec4 color = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), 1.0);
    vec4 color = vec4(mix(bottomColor, topColor, vUv.y), 1.0);
    // vec4 color = vec4(vec3(vUv,1.0), 1.0);

    gl_FragColor = color;
}
