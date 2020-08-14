var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import createProgram from './program.js';
import { createArrayBuffer, createVertexArray, createElementArrayBuffer } from './buffers.js';
import { vertex as createVertex, vertexArray } from './vertex.js';
import { vertexShader, fragmentShader } from '../shaders/sprite.js';
import createTexture from './texture.js';
export var createSprite = function (gl) { return function (_a) {
    var _b = _a.position, position = _b === void 0 ? [0.0, 0.0, 0.0] : _b, _c = _a.color, color = _c === void 0 ? [0.0, 0.0, 0.0, 0.0] : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e, texture = _a.texture, _f = _a.imagePath, imagePath = _f === void 0 ? '' : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var program, spriteTexture, _g, uniform_mvp, uniform_texture, a_position, a_color, a_uv, _h, tw, th, _j, x, y, _k, z, x2, y2, tx, ty, vertex, vertices, indices, vbo, ibo, vao;
        var _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    program = createProgram(gl)(vertexShader, fragmentShader);
                    if (!gl.isTexture(texture && texture.textureId)) return [3, 1];
                    _g = texture;
                    return [3, 3];
                case 1: return [4, createTexture(gl)(imagePath)];
                case 2:
                    _g = _q.sent();
                    _q.label = 3;
                case 3:
                    spriteTexture = _g;
                    uniform_mvp = program.getUniformLocation('mvp');
                    uniform_texture = program.getUniformLocation('u_texture');
                    a_position = program.getAttribLocation('a_position');
                    a_color = program.getAttribLocation('a_color');
                    a_uv = program.getAttribLocation('a_uv');
                    _h = __read(spriteTexture.getDimensions(), 2), tw = _h[0], th = _h[1];
                    _j = __read(position, 3), x = _j[0], y = _j[1], _k = _j[2], z = _k === void 0 ? 0 : _k;
                    x2 = x + width;
                    y2 = y + height;
                    tx = width / tw;
                    ty = height / th;
                    vertex = createVertex(gl);
                    vertices = vertexArray([
                        vertex((_l = {}, _l[a_position] = [x, y, z], _l[a_color] = color, _l[a_uv] = [0.0, 0.0], _l)),
                        vertex((_m = {}, _m[a_position] = [x2, y, z], _m[a_color] = color, _m[a_uv] = [tx, 0.0], _m)),
                        vertex((_o = {}, _o[a_position] = [x, y2, z], _o[a_color] = color, _o[a_uv] = [0.0, ty], _o)),
                        vertex((_p = {}, _p[a_position] = [x2, y2, z], _p[a_color] = color, _p[a_uv] = [tx, ty], _p)),
                    ]);
                    indices = [0, 1, 2, 2, 1, 3];
                    vbo = createArrayBuffer(gl);
                    ibo = createElementArrayBuffer(gl);
                    vao = createVertexArray(gl);
                    vbo.bind();
                    vbo.staticDrawData(vertices.data);
                    vao.bind();
                    vertices.vertexAttribPointers(program);
                    ibo.bind();
                    ibo.staticDrawData(new Uint16Array(indices));
                    ibo.unbind();
                    vao.unbind();
                    vbo.unbind();
                    return [2, {
                            getVertices: function () { return vertices; },
                            texture: spriteTexture.textureId,
                            render: function (camera) {
                                var vp = camera.getViewProjection();
                                spriteTexture.bindToUnit(1);
                                program.setUsed();
                                program.setUniformMat4f(uniform_mvp, vp, true);
                                program.setUniform1i(uniform_texture, 1);
                                vao.bind();
                                ibo.bind();
                                gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
                                ibo.unbind();
                                vao.unbind();
                                spriteTexture.unbind();
                                return;
                            },
                        }];
            }
        });
    });
}; };
export default createSprite;
//# sourceMappingURL=sprite.js.map