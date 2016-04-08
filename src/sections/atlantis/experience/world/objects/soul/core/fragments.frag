uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
uniform vec3 lightPosition;
uniform float lightMinIntensity;
uniform float lightIntensity;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    float h = normalize(vWorldPosition + offset).y;
    float alpha = abs(1.0 - vNormal.z) > 0.7 ? abs(1.0 - vNormal.z) : 0.0;

    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), alpha);
}
