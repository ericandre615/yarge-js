var maxTextures;
export var system = function (gl) {
    return {
        getParameter: function (name) { return gl.getParameter(name); },
        getMaxTextures: function () { return maxTextures || gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS); },
    };
};
export default system;
//# sourceMappingURL=system.js.map