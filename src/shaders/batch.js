export const vertexShader = `#version 100

attribute vec3 a_position;
attribute vec2 a_uv;
attribute vec4 a_color;
attribute float a_textureIndex;
attribute vec3 a_textureTransform;
attribute vec3 a_textureScale;

uniform mat4 mvp;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_textureIndex;

void main() {
  gl_Position = mvp * vec4(a_position, 1.0);
  v_color = a_color;
  v_textureIndex = a_textureIndex;

  // this works, but is very weird and manual
  mat4 TexTransform = mat4(
    vec4( a_textureScale.x, 0.0, 0.0, 0.0),
    vec4( 0.0, a_textureScale.y, 0.0, 0.0),
    vec4( 0.0, 0.0, a_textureScale.z, 0.0),
    vec4( a_textureTransform,         1.0));
  v_uv = vec2(a_textureTransform * vec4(v_uv, 1.0, 1.0));
}
`;

export const createFragmentShader = max_textures => {
const texture_switches = [];

for (let i = 0; i < max_textures; i++) {
  texture_switches.push(`
  case  ${i}:
    texColor = texture2D(u_textures[${i}u], v_uv) * v_color;
    break;
  `);
}

return `#version 100
precision mediump float;

uniform sampler2D u_textures[${max_textures}];

varying vec4 v_color;
varying vec2 v_uv;
varying float v_textureIndex;

void main() {
  //gl_FragColor = texture2D(u_texture, u_uv) * vec4(v_color);
  int ttid = int(v_textureIndex + 0.5);
  vec4 baseColor = v_color; //vec4(IN.TexColor.x, IN.TexColor.y, IN.TexColor.z, IN.TexColor.w);
  vec4 texColor = baseColor;

  switch (ttid)
  {
      ${texture_switches.join('')}
      default:
          texColor = baseColor;
          break;
  }

  gl_FragColor = texColor;
}`;
}

export default {
  vertexShader,
  createFragmentShader,
};
