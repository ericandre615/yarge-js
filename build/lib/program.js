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
var createShader = function (gl) { return function (type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    return gl.deleteShader(shader);
}; };
var createProgram = function (gl) { return function (vertexShaderSource, fragmentShaderSource) {
    var vertexShader = createShader(gl)(gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl)(gl.FRAGMENT_SHADER, fragmentShaderSource);
    var programId = gl.createProgram();
    gl.attachShader(programId, vertexShader);
    gl.attachShader(programId, fragmentShader);
    gl.linkProgram(programId);
    var success = gl.getProgramParameter(programId, gl.LINK_STATUS);
    if (!success) {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    return {
        id: programId,
        getAttribLocation: function (name) { return gl.getAttribLocation(programId, name); },
        getUniformLocation: function (name) { return gl.getUniformLocation(programId, name); },
        setUniform1i: function (location, value) { return gl.uniform1i(location, value); },
        setUniform4f: function (location, value) { return gl.uniform4f.apply(gl, __spread([location], value)); },
        setUniformMat4f: function (location, value) {
            var transpose = false;
            gl.uniformMatrix4fv(location, transpose, value);
        },
        setUsed: function () { return gl.useProgram(programId); },
    };
}; };
export default createProgram;
//# sourceMappingURL=program.js.map