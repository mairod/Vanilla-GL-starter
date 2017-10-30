precision mediump float;

attribute vec3 aPos;
attribute vec3 aColor;

varying vec3 vColor;

void main(void) {

    vColor = aColor;

    gl_PointSize = 20.;
    gl_Position = vec4(aPos, 1.0);
}