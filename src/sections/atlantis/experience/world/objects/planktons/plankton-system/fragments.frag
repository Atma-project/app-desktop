uniform float time;
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

// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
vec3 hsv2rgb(vec3 c) {

    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

    //the moving amplitude
    float timeFactor = mix(0.9, 1.0, sin(time * 0.08));

    //get length to the center
    vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;

    float len = length(toCenter);

    //get the alpha relative to the center
    float a = pow(clamp(1.0 - len, 0.0, 1.0) * intensity, intensity) * timeFactor;

    //transform hue saturation and lightness in rgb
    vec3 c = hsv2rgb(vec3(
        hue,
        saturation * len * timeFactor,
        lightness + (1.0 - len)
    ));

    gl_FragColor = vec4(c, a);
}
