precision mediump float;

uniform sampler2D uTexture;
uniform float uTime;

varying vec3 vUv;
const float division = 30.;

void main() {

    vec2 uv = vUv.xy;
    uv.x += .5 + (cos(uTime) * .2);
    uv.y += .5 + (sin(uTime) * .2);

    vec3 color = texture2D( uTexture, uv ).xyz;
    gl_FragColor = vec4(color,1.);
}