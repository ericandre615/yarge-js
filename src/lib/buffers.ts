type BufferData = ArrayBuffer | ArrayBufferView; // | SharedArrayBuffer should also be used, but TypeScript can't find this type? Superset of JS my a$$;

const createBuffer = (gl: WebGLRenderingContext) => (BUFFER_TYPE: GLenum) => {
  const bufferId = gl.createBuffer();

  return {
    bufferId,
    bind: () => gl.bindBuffer(BUFFER_TYPE, bufferId),
    unbind: () => gl.bindBuffer(BUFFER_TYPE, null),
    detach: () => gl.deleteBuffer(bufferId),
    staticDrawData: (data: BufferData) => {
      gl.bufferData(
        BUFFER_TYPE,
        data,
        gl.STATIC_DRAW
      );
    },
  };
};

export const createVertexArray = (gl: WebGLRenderingContext) => {
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

export const createDynamicArrayBuffer = (gl: WebGLRenderingContext) => {
  const bufferId = gl.createBuffer();
  let bufferOffset: GLintptr = 0;

  return {
    bufferId,
    bind: () => gl.bindBuffer(gl.ARRAY_BUFFER, bufferId),
    unbind: () => gl.bindBuffer(gl.ARRAY_BUFFER, null),
    detach: () => gl.deleteBuffer(bufferId),

    setBufferOffset: (offset: GLintptr) => { bufferOffset = offset; },
    resetBufferOffset: () => { bufferOffset = 0; },
    getBufferOffset: () => bufferOffset,
    setBufferData: (maxBufferSize: GLsizeiptr) => {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        maxBufferSize,
        //null, //?
        gl.DYNAMIC_DRAW,
      );
    },
    uploadDrawData: (data: BufferData) => {
      gl.bufferSubData(
        gl.ARRAY_BUFFER,
        bufferOffset,
        //data.length(), // >_size_in_bytes? webgl 1 doesn't use this?
        data,
      );
    },
  }
};

export const createArrayBuffer = (gl: WebGLRenderingContext) => createBuffer(gl)(gl.ARRAY_BUFFER);
export const createElementArrayBuffer = (gl: WebGLRenderingContext) => createBuffer(gl)(gl.ELEMENT_ARRAY_BUFFER);

export default {
  createArrayBuffer,
  createElementArrayBuffer,
  createVertexArray,
};

