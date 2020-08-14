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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var identity = function () { return ([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]); };
var ortho = function (left, right, bottom, top, znear, zfar) {
    if (znear === void 0) { znear = -1; }
    if (zfar === void 0) { zfar = 1; }
    var id = identity();
    var two = 2.0;
    return [
        (two / right - left), id[1], id[2], id[3],
        id[4], two / (top - bottom), id[6], id[7],
        id[8], id[9], -two / (zfar - znear), id[11],
        (right + left) / (left - right), (top + bottom) / (bottom - top), (zfar + znear) / (znear - zfar), id[15],
    ];
};
var translate = function (mat4, vec3) {
    if (mat4 === void 0) { mat4 = glm.indentity(); }
    if (vec3 === void 0) { vec3 = [0.0, 0.0, 0.0]; }
    var _a = __read(__spread(vec3, [1.0]), 4), x = _a[0], y = _a[1], z = _a[2], w = _a[3];
    var transMat = [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, w
    ];
    return mat.multiplyMatrix4(mat4, transMat);
};
var translateMat4 = function (mat4, vec3) {
    if (mat4 === void 0) { mat4 = identity(); }
    var m = __spread(mat4);
    var v0 = vec3[0];
    var v1 = vec3[1];
    var v2 = vec3[2];
    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    m[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    m[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    m[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    m[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
    return m;
};
var translation = function (mat4, vec3) {
    if (mat4 === void 0) { mat4 = identity(); }
    var dst = [];
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = vec3[0];
    dst[13] = vec3[1];
    dst[14] = vec3[2];
    dst[15] = 1;
    return dst;
};
var multMat4RowM = function (a, b) {
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4 + 0];
    var a11 = a[4 + 1];
    var a12 = a[4 + 2];
    var a13 = a[4 + 3];
    var a20 = a[8 + 0];
    var a21 = a[8 + 1];
    var a22 = a[8 + 2];
    var a23 = a[8 + 3];
    var a30 = a[12 + 0];
    var a31 = a[12 + 1];
    var a32 = a[12 + 2];
    var a33 = a[12 + 3];
    var b00 = b[0];
    var b01 = b[1];
    var b02 = b[2];
    var b03 = b[3];
    var b10 = b[4 + 0];
    var b11 = b[4 + 1];
    var b12 = b[4 + 2];
    var b13 = b[4 + 3];
    var b20 = b[8 + 0];
    var b21 = b[8 + 1];
    var b22 = b[8 + 2];
    var b23 = b[8 + 3];
    var b30 = b[12 + 0];
    var b31 = b[12 + 1];
    var b32 = b[12 + 2];
    var b33 = b[12 + 3];
    var dst = [];
    dst[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
    dst[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
    dst[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
    dst[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
    dst[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
    dst[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
    dst[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
    dst[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
    dst[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
    dst[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
    dst[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
    dst[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
    dst[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
    dst[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
    dst[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
    dst[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
    return dst;
};
var multMat4ColM = function (a, b) {
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4 + 0];
    var a11 = a[4 + 1];
    var a12 = a[4 + 2];
    var a13 = a[4 + 3];
    var a20 = a[8 + 0];
    var a21 = a[8 + 1];
    var a22 = a[8 + 2];
    var a23 = a[8 + 3];
    var a30 = a[12 + 0];
    var a31 = a[12 + 1];
    var a32 = a[12 + 2];
    var a33 = a[12 + 3];
    var b00 = b[0];
    var b01 = b[1];
    var b02 = b[2];
    var b03 = b[3];
    var b10 = b[4 + 0];
    var b11 = b[4 + 1];
    var b12 = b[4 + 2];
    var b13 = b[4 + 3];
    var b20 = b[8 + 0];
    var b21 = b[8 + 1];
    var b22 = b[8 + 2];
    var b23 = b[8 + 3];
    var b30 = b[12 + 0];
    var b31 = b[12 + 1];
    var b32 = b[12 + 2];
    var b33 = b[12 + 3];
    var dst = [];
    dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
    return dst;
};
var mat = ({
    multiplyScalar: function (n, m) { return m.map(function (p) { return n * p; }); },
    multiplyMatrix4: function (m1, m2) { return ([
        m1[0] * m2[0] + m1[1] * m2[4] + m1[2] * m2[8] + m1[3] * m2[12],
        m1[0] * m2[1] + m1[1] * m2[5] + m1[2] * m2[9] + m1[3] * m2[13],
        m1[0] * m2[2] + m1[1] * m2[6] + m1[2] * m2[10] + m1[3] * m2[14],
        m1[0] * m2[3] + m1[1] * m2[7] + m1[2] * m2[11] + m1[3] * m2[15],
        m1[4] * m2[0] + m1[5] * m2[4] + m1[6] * m2[8] + m1[7] * m2[12],
        m1[4] * m2[1] + m1[5] * m2[5] + m1[6] * m2[9] + m1[7] * m2[13],
        m1[4] * m2[2] + m1[5] * m2[6] + m1[6] * m2[10] + m1[7] * m2[14],
        m1[4] * m2[3] + m1[5] * m2[7] + m1[6] * m2[11] + m1[7] * m2[15],
        m1[8] * m2[0] + m1[9] * m2[4] + m1[10] * m2[8] + m1[11] * m2[12],
        m1[8] * m2[1] + m1[9] * m2[5] + m1[10] * m2[9] + m1[11] * m2[13],
        m1[8] * m2[2] + m1[9] * m2[6] + m1[10] * m2[10] + m1[11] * m2[14],
        m1[8] * m2[3] + m1[9] * m2[7] + m1[10] * m2[11] + m1[11] * m2[15],
        m1[12] * m2[0] + m1[13] * m2[4] + m1[14] * m2[8] + m1[15] * m2[12],
        m1[12] * m2[1] + m1[13] * m2[5] + m1[14] * m2[9] + m1[15] * m2[13],
        m1[12] * m2[2] + m1[13] * m2[6] + m1[14] * m2[10] + m1[15] * m2[14],
        m1[12] * m2[3] + m1[13] * m2[7] + m1[14] * m2[11] + m1[15] * m2[15],
    ]); },
    multMat4: function (m1, m2) {
        var cols = 4;
        var m1md = createMultiDimensionalMat(m1, cols);
        var m2md = createMultiDimensionalMat(m2, cols);
        var mm = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        for (var i = 0; i < m1md.length; i++) {
            for (var j = 0; j < m2md[0].length; j++) {
                for (var k = 0; k < m2md.length; k++) {
                    mm[i][j] += m1md[i][k] * m2md[k][j];
                }
            }
        }
        return flatMat(mm);
    },
    multMat4R: function (m1, m2) {
        var cols = 4;
        var m1md = createMultiDimensionalMat(m1, cols);
        var m2md = createMultiDimensionalMat(m2, cols);
        var mm = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        for (var i = 0; i < m1md.length; i++) {
            for (var j = 0; j < m2md[0].length; j++) {
                for (var k = 0; k < m2md.length; k++) {
                    mm[i][j] = m1md[i][j] * m2md[j][k];
                }
            }
        }
        return flatMat(mm);
    }
});
var createMultiDimensionalMat = function (m, cols) {
    if (cols === void 0) { cols = 4; }
    var m2 = [];
    for (var i = 0; i < m.length; i += cols) {
        m2.push([
            m[i], m[i + 1], m[i + 2], m[i + 3]
        ]);
    }
    return m2;
};
var flatMat = function (m) { return m.reduce(function (acc, val) { return acc.concat(val); }, []); };
export default {
    ortho: ortho,
    identity: identity,
    translate: translate,
    mat: mat,
    multMat4RowM: multMat4RowM,
    multMat4: multMat4ColM,
    translateMat4: translateMat4,
    translation: translation,
};
//# sourceMappingURL=glm.js.map