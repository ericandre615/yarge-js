import glm from '../vendor/glm.js';
var createCamera = function (width, height, kind) {
    if (width === void 0) { width = 0.0; }
    if (kind === void 0) { kind = 'ortho'; }
    var props = {
        width: width,
        height: height,
        kind: kind,
        pos: [0.0, 0.0, 0.0],
        projection: glm.ortho(0.0, width, height, 0.0, -10.0, 100.0),
        view: glm.identity(),
    };
    props.view = glm.translation(glm.identity(), props.pos);
    var setPosition = function (x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        props.pos = [x, y, z];
        props.view = glm.translation(glm.identity(), [x, y, z]);
    };
    var updateViewport = function (w, h) {
        props.width = w;
        props.height = h;
        props.projection = glm.ortho(0.0, w, h, 0.0, -10.0, 100.0);
    };
    return {
        getProjection: function () { return props.projection; },
        getPosition: function () { return props.pos; },
        setPosition: setPosition,
        updateViewport: updateViewport,
        getView: function () { return props.view; },
        getWidth: function () { return props.width; },
        getHeight: function () { return props.height; },
        getDimensions: function () { return [props.width, props.height]; },
        getViewProjection: function () { return glm.multMat4(props.projection, props.view); },
    };
};
export default createCamera;
//# sourceMappingURL=camera.js.map