export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.src = src;
  const imageLoadHandler = () => {
    image.removeEventListener('load', imageLoadHandler, false);
    image.removeEventListener('error', imageErrorHandler, false);

    return resolve(image);
  };
  const imageErrorHandler = e => {
    image.removeEventListener('load', imageLoadHandler, false);
    image.removeEventListener('error', imageErrorHandler, false);

    return reject(new Error('ImageLoadError', e));
  };

  image.addEventListener('load', imageLoadHandler, false);
  image.addEventListener('error', imageErrorHandler, false);
});

export default loadImage;

