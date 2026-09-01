#version 300 es

precision highp float;

uniform vec3 colorIn;
out vec4 outColor;

void main() {
    outColor = vec4(colorIn.r, colorIn.g, colorIn.b, 1.0);
}
