uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
uniform float alphaCut;
uniform float alphaApplied;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {

    float h = normalize(vWorldPosition + offset).y;
    // float alpha = abs(1.0 - vNormal.z) > 0.65 ? abs(1.0 - vNormal.z) : 0.0;
    float alpha = abs(1.0 - vNormal.z) > alphaCut ? alphaApplied : 0.0;
    // vec4 color = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), alpha);
    vec4 color = vec4(mix(bottomColor, topColor, vUv.y), alpha);

    gl_FragColor = color;
}
