export type ShaderSource = string;
export type ShaderProgram = {
  id: WebGLProgram,
  getAttribLocation: (name: string) => GLint,
  getUniformLocation: (name: string) => WebGLUniformLocation,
  setUniform1i: (location: WebGLUniformLocation, value: number) => void,
  setUniform4f: (location: WebGLUniformLocation, value: [number, number, number, number]) => void,
  setUniformMat4f: (location: WebGLUniformLocation, value: Float32List) => void,
  setUsed: () => void,
}

const createShader = (gl: WebGLRenderingContext) => (kind: GLenum, source: ShaderSource) => { // Boo TS, it should be easy for you to infer these types based on how they are used in this scope.... shame
  const shader = gl.createShader(kind) as WebGLShader; // I feel like I'm just tricking Typescript and this could just blow up anyways at runtime or not be what Typescript thinks it wants.  I feel like I would be better off without the useless type noise and just handle it during runtime checks as normal js. What am I missing about the value of TS?

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  return gl.deleteShader(shader);
};

const createProgram = (gl: WebGLRenderingContext) => (vertexShaderSource: ShaderSource, fragmentShaderSource: ShaderSource) => {
  const vertexShader = createShader(gl)(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl)(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const programId = gl.createProgram() as WebGLProgram;

  gl.attachShader(programId, vertexShader as WebGLShader);
  gl.attachShader(programId, fragmentShader as WebGLShader);

  gl.linkProgram(programId);

  const success = gl.getProgramParameter(programId, gl.LINK_STATUS);

  if (!success) {
    console.log(gl.getProgramInfoLog(programId));
    gl.deleteProgram(programId);
  }

  return {
    id: programId,
    getAttribLocation: (name: string) => gl.getAttribLocation(programId, name),
    getUniformLocation: (name: string) => gl.getUniformLocation(programId, name) as WebGLUniformLocation,
    setUniform1i: (location: WebGLUniformLocation, value: number) => gl.uniform1i(location, value),
    setUniform4f: (location: WebGLUniformLocation, value: [number, number, number, number]) => gl.uniform4f(location, ...value),
    setUniformMat4f: (location: WebGLUniformLocation, value: Float32List) => {
      const transpose = false; // according to mdn this MUST be false???
      gl.uniformMatrix4fv(location, transpose, value);
    },
    setUsed: () => gl.useProgram(programId),
  };
};

export default createProgram;
