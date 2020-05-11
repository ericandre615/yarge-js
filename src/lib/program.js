const createShader = gl => (type, source) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  return gl.deleteShader(shader);
};

const createProgram = gl => (vertexShaderSource, fragmentShaderSource) => {
  const vertexShader = createShader(gl)(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl)(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const programId = gl.createProgram();

  gl.attachShader(programId, vertexShader);
  gl.attachShader(programId, fragmentShader);

  gl.linkProgram(programId);

  const success = gl.getProgramParameter(programId, gl.LINK_STATUS);

  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  return {
    id: programId,
    getAttribLocation: name => gl.getAttribLocation(programId, name),
    getUniformLocation: name => gl.getUniformLocation(programId, name),
    setUniform1i: (location, value) => gl.uniform1i(location, value),
    setUniform4f: (location, value) => gl.uniform4f(location, ...value),
    setUniformMat4f: (location, value) => {
      const transpose = false; // according to mdn this MUST be false???
      gl.uniformMatrix4fv(location, transpose, value);
    },
    setUsed: () => gl.useProgram(programId),
  };
};

export default createProgram;
