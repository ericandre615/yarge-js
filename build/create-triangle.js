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
import { vertexShader, fragmentShader } from './shaders/triangle.js';
export var createTriangle = function (gl) { return function (pos, color) {
    var _a, _b, _c;
    var program = createProgram(gl)(vertexShader, fragmentShader);
    var a_position = program.getAttribLocation('a_position');
    var a_color = program.getAttribLocation('a_color');
    var vertex = createVertex(gl);
    var _d = __read(pos, 3), x = _d[0], y = _d[1], z = _d[2];
    var vertices = vertexArray([
        vertex((_a = {}, _a[a_position] = [-0.5, -0.5, 0.0], _a[a_color] = color, _a)),
        vertex((_b = {}, _b[a_position] = [0.5, 0.0, 0.0], _b[a_color] = color, _b)),
        vertex((_c = {}, _c[a_position] = [0.5, -0.5, 0.0], _c[a_color] = color, _c)),
    ]);
    var indices = [0, 1, 2];
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
            var projection = camera.getProjection();
            program.setUsed();
            vao.bind();
            ibo.bind();
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
            ibo.unbind();
            vao.unbind();
            return;
        },
    };
}; };
export default createTriangle;
//# sourceMappingURL=create-triangle.js.map