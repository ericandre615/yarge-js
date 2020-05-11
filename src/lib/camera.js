import glm from '../vendor/glm.js';

const createCamera = (width, height, kind = 'ortho') => {
  const props = {
    width,
    height,
    kind,
    pos: [0.0, 0.0, 0.0],
    projection: glm.ortho(0.0, width, height, 0.0, -10.0, 100.0),
    view: undefined,
  };

  props.view = glm.translation(glm.identity(), props.pos);

  const setPosition = (x = 0, y = 0, z = 0) => {
    props.pos = [x, y, z]
    props.view = glm.translation(glm.identity(), [x, y, z]);
  };

  const updateViewport = (w, h) => {
    props.width = w;
    props.height = h;
    props.projection = glm.ortho(0.0, w, h, 0.0, -10.0, 100.0);
  };

  return {
    getProjection: () => props.projection,
    getPosition: () => props.pos,
    setPosition,
    updateViewport,
    getView: () => props.view,
    getWidth: () => props.width,
    getHeight: () => props.height,
    getDimensions: () => [props.width, props.height],
    getViewProjection: () => glm.multMat4(props.projection, props.view),
  };
};

export default createCamera;

