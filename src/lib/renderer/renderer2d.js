import system from '../system.js';
import { vertexShader, createFragmentShader } from '../../shaders/batch.js';
import createProgram from './program.js';
import { createDynamicArrayBuffer, createVertexArray, createElementArrayBuffer } from './buffers.js';
import { vertex as createVertex, vertexArray } from './vertex.js';

const renderState = {
  program,
  vertices,
  indices,
  layers,
  vbo,
  vao,
  ibo,
  clearColor,
  maxTextures,
  textureSlots,
  uniforms,
  sprintCount,
  renderTarget,
};

const batchVertexStruct = {
  pos: [0, 0, 0],
  uv: [0, 0],
  color: [0, 0, 0, 0],
  texTransform: [0, 0, 0],
  texScale: [0, 0, 0],
  texId: [0],
};

const generateBatchIndices = max => {
  let offset = 0;
  const indices = [];

  // TODO: maybe take in a format or base it off given vertices?
  // as this needs to match the order of a sprites vertices
  // this order is more of a top left to bottom right
  for (let i = 0; i <= max; i++) {
    let group = [
      offset + 0,
      offset + 1,
      offset + 2,
      offset + 2,
      offset + 1,
      offset + 3,
    ];

    indices.push(group);

    offset += 4;
  }

  return indices;
};

const DEFAULT_CLEAR_COLOR = [1, 1, 1, 1];
const renderer2d = gl => {
  //let max_index_size = ((::std::mem::size_of::<[u32; 6]>()) * 4000) as gl::types::GLsizeiptr;
  const maxSprites = 1000; // TODO: just a random value for now
  const batchVertex = createVertex(gl);
  const batchVertexLayout = batchVertex(batchVertexStruct);
  const batchVertexSize = batchVertexLayout.sizeInBytes;
  const maxBufferSize = batchVertexSize * maxSprites;
  const maxTextures = system.get_max_textures();
  const program = createProgram(gl)(vertexShader, createFragmentShader(maxTextures));
  const uniformTextures = program.getUniformLocation('u_textures");
  const uniformMvp = program.getUniformLocation('mvp');
  const textureSlots = Array(maxTextures).fill(0);

  const vbo = createDynamicArrayBuffer(gl);
  const vao = createVertexArray(gl);
  const ibo = createElementArrayBuffer(gl);

  const indices = generateBatchIndices(maxSprites);

  vbo.bind();
  vbo.setBufferData(maxBufferSize);

  vao.bind();

  batchVertexLayout.vertexAttribPointers();

  ibo.bind();
  ibo.staticDrawData(indices);
  ibo.unbind();

  vbo.unbind();
  vao.unbind();

  const state = {
    maxTextures,
    textureSlots,
    spriteCount: 0,
    drawCalls: 0,
  };

  return {
    beginScene: () => {},
    endScene: () => {},
    submit: renderables => {
      const sprites = renderables.length ? renderables : [renderables];
      if (spriteCount >= maxSprites) {
        // TODO: need to flush/reset
        console.log('RENDERER2D: hit maxSprite limit');
      }

      sprites.forEach(sprite => {
        const spriteTexture = sprite.texture;
        const texId = textureSlots.indexOf(spriteTexture);
      });
    },
    render: camera => {

    },
  };
}

export default renderer2d;

