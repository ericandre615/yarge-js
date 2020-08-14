export var getGlContext = function (canvasId) {
    if (canvasId === void 0) { canvasId = ''; }
    var canvas = document.getElementById(canvasId);
    var gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('WebGL is not supported on your platform');
    }
    return gl;
};
export default getGlContext;
//# sourceMappingURL=gl.js.map