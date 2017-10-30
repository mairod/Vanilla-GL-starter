precision mediump float;

attribute vec3 aPos;

void main(void) {
    gl_PointSize = 20.;
    gl_Position = vec4(aPos, 1.0);
}