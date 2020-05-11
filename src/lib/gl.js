export const getGlContext = canvasId => {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl');

  if (!gl) { throw new Error('WebGL is not supported on your platform'); }

  return gl;
}

export default getGlContext;

