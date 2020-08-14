export const getGlContext = (canvasId = '') => {
  const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
  const gl: WebGLRenderingContext = canvas.getContext('webgl') as WebGLRenderingContext;

  if (!gl) { throw new Error('WebGL is not supported on your platform'); }

  return gl;
}

export default getGlContext;

