uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
uniform float time;
uniform float displacement;


uniform vec3 lightPosition;
uniform float lightMinIntensity;
uniform float lightIntensity;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;


void main() {

    vec3 lightDirection = normalize(lightPosition - vWorldPosition);
    float c = lightMinIntensity + max(0.0, dot(vNormal, lightDirection)) * lightIntensity;
    // c = c > 0.1 ? 0.9 : 0.5;
    vec4 light = vec4(c, c, c, 1.0);

    float h = normalize(vWorldPosition + offset).y;
    // vec4 color = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), vUv.y)), 1.0);
    vec4 color = vec4(mix(bottomColor, topColor, vUv.y), 1.0);

    gl_FragColor = color * light;
}
