uniform float uTime;
uniform float uPatch;
uniform float baseGlow;
uniform float amount;
uniform float sepiaRatio;
uniform float noiseRatio;
uniform float lightRatio;
uniform sampler2D texture;

const float PI = 3.14159265358979323846264;

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float clampNorm(float val, float min, float max) {
    return clamp((val - min) / (max - min), 0.0, 1.0);
}

float lightField(float angle, float angleScale, float t1, float t2, float patchSize) {
    return mix(
        clamp(snoise(vec2(angle * angleScale + t1, t2)), 0.0, 1.0),
        clamp(snoise(vec2(-angle * angleScale + t1, t2)), 0.0, 1.0),
        clampNorm(angle, PI - patchSize, PI)
    );
}

vec3 getSepiaColor(vec3 rgb){
    return vec3(dot(rgb, vec3(0.299, 0.587, 0.114))) * vec3(1.2, 1.0, 0.8);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

    float thersh = 256.0 / 512.0;
    vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;
    float d = length(toCenter);
    float angle = atan(toCenter.y, toCenter.x);
    float ratio = clampNorm(d, thersh, 1.);
    float alpha = 0.0;

    alpha += pow(1.0 - ratio, 6.0) * baseGlow;

    float lightNoise = lightField(angle, 2.5, uTime * .0005, uTime * 0.01, .5 * uPatch);
    ratio = clampNorm(d, thersh, thersh + (1. - thersh) * lightNoise);
    alpha += pow(1. - ratio, 2.) * lightRatio * step(1.0, amount);

    lightNoise = lightField(angle, 4.5 , .2, uTime * 0.01, .3 * uPatch);
    ratio = clampNorm(d, thersh, thersh + (1. - thersh) * lightNoise);
    alpha += pow(1. - ratio, 3.) * lightRatio * step(2.0, amount);

    lightNoise = lightField(angle, 6.0, -.3, uTime * 0.01, .2 * uPatch);
    ratio = clampNorm(d, thersh, thersh + (1. - thersh) * lightNoise);
    alpha += pow(1. - ratio, 4.) * lightRatio * step(3.0, amount);

    ratio = clampNorm(d, 0., thersh);

    vec4 color = texture2D( texture, gl_PointCoord.xy + sin(gl_PointCoord.x * 30.0 + uTime * 0.01 + cos(gl_PointCoord.y * 30.0 + uTime * 0.01)) * 0.01 * ratio);

    float r = rand(gl_PointCoord.xy + rand(gl_PointCoord.yx + uTime));
    color.rgb = mix(clamp(color.rgb, 0., 1.), vec3(r, r, r), noiseRatio * .3 * ratio);

    color.rgb += pow(clampNorm(ratio, .8 - baseGlow * .8, 1.), 2.0) * baseGlow;

    color *= clamp(alpha, 0.0, 1.0);

    color.rgb = mix(color.rgb, getSepiaColor(color.rgb), sepiaRatio *.7);

    gl_FragColor = vec4(color.r, color.g, color.b, alpha);
    // gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
