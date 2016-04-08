uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    // float h = normalize(vWorldPosition + offset).y;
    // float alpha = abs(1.0 - vNormal.z) > 0.5 ? abs(1.0 - vNormal.z) : 0.0;
    //gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), alpha);

    vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;
    float len = length(toCenter);
    float a = 1.0 - len;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
}
