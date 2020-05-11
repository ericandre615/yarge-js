import createProgram from './lib/program.js';
import { createArrayBuffer, createVertexArray, createElementArrayBuffer } from './lib/buffers.js';
import { vertex as createVertex, vertexArray } from './lib/vertex.js';
import { vertexShader, fragmentShader } from './shaders/quad.js';

export const createQuad = gl => ({
  position = [0.0, 0.0, 0.0],
  color = [0.0, 0.0, 0.0, 0.0],
  width = 0,
  height = 0,
}) => {
  const program = createProgram(gl)(vertexShader, fragmentShader);
  const uniform_mvp = program.getUniformLocation('mvp');
  const a_position = program.getAttribLocation('a_position');
  const a_color = program.getAttribLocation('a_color');

  const [x, y, z] = position;
  const x2 = x + width;
  const y2 = y + height;

  const vertex = createVertex(gl);
  const vertices = vertexArray([
    vertex({ [a_position]: [x, y, z], [a_color]: color }),
    vertex({ [a_position]: [x2, y, z], [a_color]: color }),
    vertex({ [a_position]: [x, y2, z], [a_color]: color }),
    vertex({ [a_position]: [x2, y2, z], [a_color]: color }),
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
    render: (camera) => {
      //const vp =[
      //  0.001953125,
      //  0.0,
      //  0.0,
      //  0.0,
      //  0.0,
      //  -0.0028449502,
      //  0.0,
      //  0.0,
      //  0.0,
      //  0.0,
      //  -0.018181818,
      //  0.0,
      //  -1.0,
      //  1.0,
      //  -0.8181818,
      //  1.0,
      //];
      const vp = camera.getViewProjection();
      program.setUsed();
      program.setUniformMat4f(uniform_mvp, vp, true);

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

      return;
    },
  };
};

export default createQuad;
