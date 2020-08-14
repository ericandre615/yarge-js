var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import createProgram from './lib/program.js';
import { createArrayBuffer, createVertexArray, createElementArrayBuffer } from './lib/buffers.js';
import { vertex as createVertex, vertexArray } from './lib/vertex.js';
import { vertexShader, fragmentShader } from './shaders/quad.js';
export var createQuad = function (gl) { return function (_a) {
    var _b, _c, _d, _e;
    var _f = _a.position, position = _f === void 0 ? [0.0, 0.0, 0.0] : _f, _g = _a.color, color = _g === void 0 ? [0.0, 0.0, 0.0, 0.0] : _g, _h = _a.width, width = _h === void 0 ? 0 : _h, _j = _a.height, height = _j === void 0 ? 0 : _j;
    var program = createProgram(gl)(vertexShader, fragmentShader);
    var uniform_mvp = program.getUniformLocation('mvp');
    var a_position = program.getAttribLocation('a_position');
    var a_color = program.getAttribLocation('a_color');
    var _k = __read(position, 3), x = _k[0], y = _k[1], z = _k[2];
    var x2 = x + width;
    var y2 = y + height;
    var vertex = createVertex(gl);
    var vertices = vertexArray([
        vertex((_b = {}, _b[a_position] = [x, y, z], _b[a_color] = color, _b)),
        vertex((_c = {}, _c[a_position] = [x2, y, z], _c[a_color] = color, _c)),
        vertex((_d = {}, _d[a_position] = [x, y2, z], _d[a_color] = color, _d)),
        vertex((_e = {}, _e[a_position] = [x2, y2, z], _e[a_color] = color, _e)),
    ]);
    var indices = [0, 1, 2, 2, 1, 3];
    var vbo = createArrayBuffer(gl);
    var ibo = createElementArrayBuffer(gl);
    var vao = createVertexArray(gl);
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
        render: function (camera) {
            var vp = camera.getViewProjection();
            program.setUsed();
            program.setUniformMat4f(uniform_mvp, vp);
            vao.bind();
            ibo.bind();
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
            ibo.unbind();
            vao.unbind();
            return;
        },
    };
}; };
export default createQuad;
//# sourceMappingURL=create-quad.js.map