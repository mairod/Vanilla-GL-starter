precision mediump float;

attribute vec3 aPos;
attribute vec3 aPosRand;

uniform float uTime;

void main(void) {

    vec3 pos = mix(aPos, aPosRand, abs(cos(uTime)));

    gl_PointSize = 1.;
    gl_Position = vec4(pos, 1.0);
}