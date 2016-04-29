varying vec2 v_uv;
varying vec3 v_line_color;

varying vec3 vNormal;

uniform vec3 lightPosition;
uniform float lightMinIntensity;
uniform float lightIntensity;

varying vec3 vWorldPosition;

#define M_PI 3.1415926535897932384626433832795

void main()
{
   vec4 temp;

   float alpha = sin(v_uv.y * M_PI) / 4.;
   temp = vec4(v_line_color, alpha);

   vec3 lightDirection = normalize(lightPosition - vWorldPosition);
   float c = lightMinIntensity + max(0.0, dot(vNormal, lightDirection)) * lightIntensity;
   vec4 light = vec4(c, c, c, 1.0);

   gl_FragColor = temp * light;
}
