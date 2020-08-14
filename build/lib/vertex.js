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
var duckType = function (t) { return Object.prototype.toString.call(t); };
var isString = function (v) { return (duckType(v) == '[object String]' && isNaN(v)); };
var isNumber = function (v) { return (duckType(v) == '[object Number]' && !isNaN(v)); };
var byteSize = 4;
var getSizeInBytes = function (data) { return (data.length * data.BYTES_PER_ELEMENT); };
export var vertex = function (gl) { return function (vertexData) {
    var data = new Float32Array(Object.keys(vertexData).reduce(function (acc, curr) { return acc.concat.apply(acc, __spread(vertexData[curr])); }, []));
    return {
        data: data,
        sizeInBytes: getSizeInBytes(data),
        vertexAttribPointers: function (program) {
            return Object.keys(vertexData).forEach(function (attribute, i, attrs) {
                var attrData = new Float32Array(vertexData[attribute]);
                var attr = isNumber(parseInt(attribute, 10))
                    ? attribute
                    : program.getAttribLocation(attribute);
                var normalized = false;
                var stride = getSizeInBytes(data);
                var offset = i == 0
                    ? 0
                    : vertexData[attrs[i - 1]].length * byteSize || 0;
                gl.enableVertexAttribArray(attr);
                gl.vertexAttribPointer(attr, attrData.length, gl.FLOAT, normalized, stride, offset);
            });
        },
    };
}; };
export var vertexArray = function (vertices) { return ({
    data: new Float32Array(vertices.reduce(function (acc, _a) {
        var data = _a.data;
        return acc.concat.apply(acc, __spread(data));
    }, [])),
    sizeInBytes: vertices[0].sizeInBytes,
    vertexAttribPointers: vertices[0].vertexAttribPointers,
}); };
export default {
    vertex: vertex,
    vertexArray: vertexArray
};
//# sourceMappingURL=vertex.js.map