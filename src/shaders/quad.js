export const vertexShader = `#version 100

attribute vec3 a_position;
attribute vec4 a_color;

uniform mat4 mvp;

varying vec4 v_color;

void main() {
  gl_Position = mvp * vec4(a_position, 1.0);
  v_color = a_color;
}
`;

export const fragmentShader = `#version 100
precision mediump float;

varying vec4 v_color;

void main() {
  gl_FragColor = vec4(v_color);
}
`;

export default {
  vertexShader,
  fragmentShader,
};
