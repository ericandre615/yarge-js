export const loadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const image: HTMLImageElement = new Image();
  image.src = src;
  const imageLoadHandler = () => {
    image.removeEventListener('load', imageLoadHandler, false);
    image.removeEventListener('error', imageErrorHandler, false);

    return resolve(image);
  };
  const imageErrorHandler = (e: ErrorEvent) => {
    image.removeEventListener('load', imageLoadHandler, false);
    image.removeEventListener('error', imageErrorHandler, false);

    return reject(new Error(`ImageLoadError:　${e}`));
  };

  image.addEventListener('load', imageLoadHandler, false);
  image.addEventListener('error', imageErrorHandler, false);
});

export default loadImage;

