const createBuffer = gl => (BUFFER_TYPE) => {
  const bufferId = gl.createBuffer();

  return {
    bufferId,
    bind: () => gl.bindBuffer(BUFFER_TYPE, bufferId),
    unbind: () => gl.bindBuffer(BUFFER_TYPE, null),
    detach: () => gl.deleteBuffer(1, bufferId),
    staticDrawData: (bufferData) => {
      gl.bufferData(
        BUFFER_TYPE,
        bufferData,
        gl.STATIC_DRAW
      );
    },
  };
};

export const createVertexArray = gl => {
  const ext = (
    gl.getExtension('OES_vertex_array_object') ||
    gl.getExtension('MOZ_OES_vertex_array_object') ||
    gl.getExtension('WEBKIT_OES_vertex_array_object')
  );

  const bufferId = ext.createVertexArrayOES();

  return {
    bufferId,
    bind: () => ext.bindVertexArrayOES(bufferId),
    unbind: () => ext.bindVertexArrayOES(null),
    detach: () => ext.deleteVertexArrayOES(bufferId),
  };
};

export const createDynamicArrayBuffer = gl => {
  const bufferId = gl.createBuffer();
  const bufferOffset = 0;

  return {
    bufferId,
    bind: () => gl.bindBuffer(gl.ARRAY_BUFFER, bufferId),
    unbind: () => gl.bindBuffer(gl.ARRAY_BUFFER, null),
    detach: () => gl.deleteBuffer(1, bufferId),

    setBufferOffse: offset => { bufferOffset = offset; },
    resetBufferOffset: () => { bufferOffset = 0; },
    getBufferOffset: () => bufferOffset,
    setBufferData: maxBufferSize => {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        maxBufferSize,
        null, //?
        gl.DYNAMIC_DRAW,
      );
    },
    uploadDrawData: data => {
      gl.bufferSubData(
        gl.ARRAY_BUFFER,
        bufferOffset,
        //data.length(), // >_size_in_bytes? webgl 1 doesn't use this?
        data,
      );
    },
  }
};

export const createArrayBuffer = gl => createBuffer(gl)(gl.ARRAY_BUFFER);
export const createElementArrayBuffer = gl => createBuffer(gl)(gl.ELEMENT_ARRAY_BUFFER);

export default {
  createArrayBuffer,
  createElementArrayBuffer,
  createVertexArray,
};

