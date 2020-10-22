let maxTextures: number = 0;

interface SystemInfo {
  getParameter: (name: GLenum) => any,
  getMaxTextures: () => number,
}

export const system = (gl: WebGLRenderingContext): SystemInfo => {
  return {
    getParameter: name => gl.getParameter(name),
    getMaxTextures: () => maxTextures || gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
  }
};

export default system;

