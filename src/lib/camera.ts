import glm from '../vendor/glm.js';

type Matrix4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
]

type Position = [number, number, number];

export interface Camera {
  getProjection: () => Matrix4,
  getPosition: () => Position,
  setPosition: (x: number, y: number, z: number) => void,
  updateViewport: (w: number, h: number) => void,
  getView: () => Matrix4,
  getWidth: () => number,
  getHeight: () => number,
  getDimensions: () => [number, number],
  getViewProjection: () => Matrix4,
}

type CameraProps = {
  width: number,
  height: number,
  kind: string,
  pos: Position,
  projection: Matrix4,
  view: Matrix4,
}

const createCamera = (width = 0.0, height: 0.0, kind = 'ortho'): Camera => {
  const props: CameraProps = {
    width,
    height,
    kind,
    pos: [0.0, 0.0, 0.0],
    projection: glm.ortho(0.0, width, height, 0.0, -10.0, 100.0) as Matrix4,
    view: glm.identity() as Matrix4,
  };

  props.view = glm.translation(glm.identity(), props.pos) as Matrix4;

  const setPosition = (x = 0, y = 0, z = 0) => {
    props.pos = [x, y, z];
    props.view = glm.translation(glm.identity(), [x, y, z]) as Matrix4;
  };

  const updateViewport = (w: number, h:number) => {
    props.width = w;
    props.height = h;
    props.projection = glm.ortho(0.0, w, h, 0.0, -10.0, 100.0) as Matrix4;
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
    getViewProjection: () => glm.multMat4(props.projection, props.view) as Matrix4,
  };
};

export default createCamera;

