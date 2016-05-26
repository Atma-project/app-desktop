uniform float time;
uniform float frame;
uniform float size;
uniform vec3 color;
uniform sampler2D texture;

varying vec3 vNormal;
varying vec4 mvPosition;
varying float vRotate;

void main() {

    vec4 outColor = texture2D( texture, gl_PointCoord );
    // if ( outColor.a < 0.1) discard;

    gl_FragColor = vec4(color, outColor.a);
}
