uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    float h = normalize(vWorldPosition + offset).y;
    // float alpha = abs(1.0 - vNormal.z) > 0.65 ? abs(1.0 - vNormal.z) : 0.0;
    float alpha = abs(1.0 - vNormal.z) > 0.5 ? 0.6 : 0.0;
    vec4 color = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), alpha);

    gl_FragColor = color;
}
