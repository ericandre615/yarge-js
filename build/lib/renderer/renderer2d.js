import system from '../system.js';
import { vertexShader, createFragmentShader } from '../../shaders/batch.js';
import createProgram from './program.js';
import { createDynamicArrayBuffer, createVertexArray, createElementArrayBuffer } from './buffers.js';
import { vertex as createVertex } from './vertex.js';
var renderState = {
    program: program,
    vertices: vertices,
    indices: indices,
    layers: layers,
    vbo: vbo,
    vao: vao,
    ibo: ibo,
    clearColor: clearColor,
    maxTextures: maxTextures,
    textureSlots: textureSlots,
    uniforms: uniforms,
    sprintCount: sprintCount,
    renderTarget: renderTarget,
};
var batchVertexStruct = {
    pos: [0, 0, 0],
    uv: [0, 0],
    color: [0, 0, 0, 0],
    texTransform: [0, 0, 0],
    texScale: [0, 0, 0],
    texId: [0],
};
var generateBatchIndices = function (max) {
    var offset = 0;
    var indices = [];
    for (var i = 0; i <= max; i++) {
        var group = [
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
var DEFAULT_CLEAR_COLOR = [1, 1, 1, 1];
var renderer2d = function (gl) {
    var maxSprites = 1000;
    var batchVertex = createVertex(gl);
    var batchVertexLayout = batchVertex(batchVertexStruct);
    var batchVertexSize = batchVertexLayout.sizeInBytes;
    var maxBufferSize = batchVertexSize * maxSprites;
    var maxTextures = system.get_max_textures();
    var program = createProgram(gl)(vertexShader, createFragmentShader(maxTextures));
    var uniformTextures = program.getUniformLocation('u_textures');
    var uniformMvp = program.getUniformLocation('mvp');
    var textureSlots = Array(maxTextures).fill(0);
    var vbo = createDynamicArrayBuffer(gl);
    var vao = createVertexArray(gl);
    var ibo = createElementArrayBuffer(gl);
    var indices = generateBatchIndices(maxSprites);
    vbo.bind();
    vbo.setBufferData(maxBufferSize);
    vao.bind();
    batchVertexLayout.vertexAttribPointers();
    ibo.bind();
    ibo.staticDrawData(indices);
    ibo.unbind();
    vbo.unbind();
    vao.unbind();
    var state = {
        maxTextures: maxTextures,
        textureSlots: textureSlots,
        spriteCount: 0,
        drawCalls: 0,
    };
    return {
        beginScene: function () { },
        endScene: function () { },
        submit: function (renderables) {
            var sprites = renderables.length ? renderables : [renderables];
            if (spriteCount >= maxSprites) {
                console.log('RENDERER2D: hit maxSprite limit');
            }
            sprites.forEach(function (sprite) {
                var spriteTexture = sprite.texture;
                var texId = textureSlots.indexOf(spriteTexture);
            });
        },
        render: function (camera) {
        },
    };
};
export default renderer2d;
//# sourceMappingURL=renderer2d.js.map