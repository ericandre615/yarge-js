import loadImage from '../loaders/image.js';

const isPowerOf2 = value => ((value & (value - 1)) == 0);

export const createTexture = gl => async (
  imagePath = '',
  options = {},
) => {
  const image = await loadImage(imagePath);

  const textureId = gl.createTexture();

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.bindTexture(gl.TEXTURE_2D, textureId);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // Check if the image is a power of 2 in both dimensions.
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
  // Yes, it's a power of 2. Generate mips.
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  return {
    textureId,
    getDimensions: () => ([image.width, image.height]),
    bind: () => gl.bindTexture(gl.TEXTURE_2D, textureId),
    bindToUnit: unit => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, textureId);
    },
    unbind: () => gl.bindTexture(gl.TEXTURE_2D, null),
    detach: () => gl.deleteTextures(1, textureId),
  };
};

export default createTexture;
