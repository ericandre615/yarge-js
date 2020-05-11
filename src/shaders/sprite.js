export const vertexShader = `#version 100

attribute vec3 a_position;
attribute vec4 a_color;
attribute vec2 a_uv;

uniform mat4 mvp;

varying vec2 v_uv;
varying vec4 v_color;

void main() {
  gl_Position = mvp * vec4(a_position, 1.0);
  v_color = a_color;
  v_uv = a_uv;
}
`;

export const fragmentShader = `#version 100
precision mediump float;

varying vec4 v_color;
varying vec2 v_uv;

uniform sampler2D u_texture;

//uniform vec4 u_color;

void main() {
  vec4 use_color = v_color.xyzw;
  // TODO: I'm getting a weird bug/issue/behavior here. It just won't work
  // when trying to use even a single component from the v_color with the texture,
  // hard coding works,
  // using v_color without the texture works. Its frustrating and confusing
  // and I just need to move on, for now
  //gl_FragColor = vec4(use_color.xyzw);
  gl_FragColor = texture2D(u_texture, v_uv);// * vec4(v_color.xyz, 1);
}
`;

export default {
  vertexShader,
  fragmentShader,
};
