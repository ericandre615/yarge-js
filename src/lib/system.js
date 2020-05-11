let maxTextures;

export const system = gl => {
  return {
    getParameter: name => gl.getParameter(name),
    getMaxTextures: () => maxTextures || gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
  }
};

export default system;

