export var loadImage = function (src) { return new Promise(function (resolve, reject) {
    var image = new Image();
    image.src = src;
    var imageLoadHandler = function () {
        image.removeEventListener('load', imageLoadHandler, false);
        image.removeEventListener('error', imageErrorHandler, false);
        return resolve(image);
    };
    var imageErrorHandler = function (e) {
        image.removeEventListener('load', imageLoadHandler, false);
        image.removeEventListener('error', imageErrorHandler, false);
        return reject(new Error('ImageLoadError', e));
    };
    image.addEventListener('load', imageLoadHandler, false);
    image.addEventListener('error', imageErrorHandler, false);
}); };
export default loadImage;
//# sourceMappingURL=image.js.map