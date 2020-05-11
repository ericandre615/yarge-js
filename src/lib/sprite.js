import createProgram from './program.js';
import { createArrayBuffer, createVertexArray, createElementArrayBuffer } from './buffers.js';
import { vertex as createVertex, vertexArray } from './vertex.js';
import { vertexShader, fragmentShader } from '../shaders/sprite.js';
import createTexture from './texture.js';

export const createSprite = gl => async ({
  position = [0.0, 0.0, 0.0],
  color = [0.0, 0.0, 0.0, 0.0],
  width = 0,
  height = 0,
  texture,
  imagePath = '',
}) => {
  const program = createProgram(gl)(vertexShader, fragmentShader);
  const spriteTexture = gl.isTexture(texture && texture.textureId)
    ? texture
    : await createTexture(gl)(imagePath);
  const uniform_mvp = program.getUniformLocation('mvp');
  const uniform_texture = program.getUniformLocation('u_texture');
  const a_position = program.getAttribLocation('a_position');
  const a_color = program.getAttribLocation('a_color');
  const a_uv = program.getAttribLocation('a_uv');
  const [tw, th] = spriteTexture.getDimensions();
  const [x, y, z = 0] = position;
  const x2 = x + width;
  const y2 = y + height;
  const tx = width / tw;
  const ty = height / th;
  const vertex = createVertex(gl);
  const vertices = vertexArray([
    vertex({ [a_position]: [x, y, z], [a_color]: color, [a_uv]: [0.0, 0.0] }),
    vertex({ [a_position]: [x2, y, z], [a_color]: color, [a_uv]: [tx, 0.0] }),
    vertex({ [a_position]: [x, y2, z], [a_color]: color, [a_uv]: [0.0, ty] }),
    vertex({ [a_position]: [x2, y2, z], [a_color]: color, [a_uv]: [tx, ty] }),
  ]);
  const indices = [0, 1, 2, 2, 1, 3];

  const vbo = createArrayBuffer(gl);
  const ibo = createElementArrayBuffer(gl);
  const vao = createVertexArray(gl);

  vbo.bind();
  vbo.staticDrawData(vertices.data);

  vao.bind();

  vertices.vertexAttribPointers(program);

  ibo.bind();
  ibo.staticDrawData(new Uint16Array(indices));
  ibo.unbind();

  vao.unbind();
  vbo.unbind();

  return {
    getVertices: () => vertices,
    texture: spriteTexture.textureId,
    render: (camera) => {
      const vp = camera.getViewProjection();

      spriteTexture.bindToUnit(1);

      program.setUsed();
      program.setUniformMat4f(uniform_mvp, vp, true);
      program.setUniform1i(uniform_texture, 1);

      vao.bind();

      ibo.bind();

      gl.drawElements(
        gl.TRIANGLES,
        indices.length,
        gl.UNSIGNED_SHORT,
        0
      );

      ibo.unbind();
      vao.unbind();

      spriteTexture.unbind();

      return;
    },
  };
};

export default createSprite;
