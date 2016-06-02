uniform sampler2D texture;
uniform vec3 color;
varying vec2 vUv;
void main()
{
    vec3 tColor = texture2D( texture, vUv ).rgb;
    float threshold = texture2D( texture, vUv ).r;
    float a = length(tColor - color) - 0.5;

//		gl_FragColor = vec4(a, a, a, 1.0);
    // gl_FragColor = vec4(tColor, a);
    gl_FragColor = vec4(mix(color, tColor, threshold), threshold);
}
