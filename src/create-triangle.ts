import createProgram from './lib/program.js';
import { createArrayBuffer, createVertexArray, createElementArrayBuffer } from './lib/buffers.js';
import { vertex as createVertex, vertexArray } from './lib/vertex.js';
import { vertexShader, fragmentShader } from './shaders/triangle.js';

import type { RGBA } from './lib/color';
import type { Camera } from './lib/camera';

type Position = [number, number, number];

export const createTriangle = (gl: WebGLRenderingContext) => (pos: Position, color: RGBA) => {
  const program = createProgram(gl)(vertexShader, fragmentShader);
  const a_position = program.getAttribLocation('a_position');
  const a_color = program.getAttribLocation('a_color');
  const vertex = createVertex(gl);
  const [x, y, z] = pos;
  const vertices = vertexArray([
    vertex({ [a_position]: [-0.5, -0.5, 0.0], [a_color]: color }),
    vertex({ [a_position]: [0.5, 0.0, 0.0], [a_color]: color }),
    vertex({ [a_position]: [0.5, -0.5, 0.0], [a_color]: color }),
  ]);
  const indices = [0, 1, 2];

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
    render: (camera: Camera) => {
      const projection = camera.getProjection();

      program.setUsed();

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

export default createTriangle;
