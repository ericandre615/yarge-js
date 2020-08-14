var createBuffer = function (gl) { return function (BUFFER_TYPE) {
    var bufferId = gl.createBuffer();
    return {
        bufferId: bufferId,
        bind: function () { return gl.bindBuffer(BUFFER_TYPE, bufferId); },
        unbind: function () { return gl.bindBuffer(BUFFER_TYPE, null); },
        detach: function () { return gl.deleteBuffer(1, bufferId); },
        staticDrawData: function (bufferData) {
            gl.bufferData(BUFFER_TYPE, bufferData, gl.STATIC_DRAW);
        },
    };
}; };
export var createVertexArray = function (gl) {
    var ext = (gl.getExtension('OES_vertex_array_object') ||
        gl.getExtension('MOZ_OES_vertex_array_object') ||
        gl.getExtension('WEBKIT_OES_vertex_array_object'));
    var bufferId = ext.createVertexArrayOES();
    return {
        bufferId: bufferId,
        bind: function () { return ext.bindVertexArrayOES(bufferId); },
        unbind: function () { return ext.bindVertexArrayOES(null); },
        detach: function () { return ext.deleteVertexArrayOES(bufferId); },
    };
};
export var createDynamicArrayBuffer = function (gl) {
    var bufferId = gl.createBuffer();
    var bufferOffset = 0;
    return {
        bufferId: bufferId,
        bind: function () { return gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); },
        unbind: function () { return gl.bindBuffer(gl.ARRAY_BUFFER, null); },
        detach: function () { return gl.deleteBuffer(1, bufferId); },
        setBufferOffse: function (offset) { bufferOffset = offset; },
        resetBufferOffset: function () { bufferOffset = 0; },
        getBufferOffset: function () { return bufferOffset; },
        setBufferData: function (maxBufferSize) {
            gl.bufferData(gl.ARRAY_BUFFER, maxBufferSize, null, gl.DYNAMIC_DRAW);
        },
        uploadDrawData: function (data) {
            gl.bufferSubData(gl.ARRAY_BUFFER, bufferOffset, data);
        },
    };
};
export var createArrayBuffer = function (gl) { return createBuffer(gl)(gl.ARRAY_BUFFER); };
export var createElementArrayBuffer = function (gl) { return createBuffer(gl)(gl.ELEMENT_ARRAY_BUFFER); };
export default {
    createArrayBuffer: createArrayBuffer,
    createElementArrayBuffer: createElementArrayBuffer,
    createVertexArray: createVertexArray,
};
//# sourceMappingURL=buffers.js.map