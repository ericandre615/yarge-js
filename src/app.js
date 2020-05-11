import './vendor/raf-polyfill.js';

import getGlContext from './lib/gl.js';

const getCanvas = canvasId => document.getElementById(canvasId);

const PAUSE = 80;

const app = {
  gl: undefined,
  canvas: undefined,
  run: undefined,
  state: undefined,
  extensions: undefined,
};

const runApp = async ({
  update = (state) => state,
} = {}) => {
  let rafId = undefined;
  const { gl, canvas } = app;
  app.state.setIsRunning(true);

  const internalUpdate = time => {
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(...app.state.clearColor());
    gl.clear(gl.COLOR_BUFFER_BIT);

    update({ ...app.state, time });

    rafId = requestAnimationFrame(internalUpdate);
  };

  const pauseApp = e => {
    if (e.keyCode === PAUSE) {
      if (app.state.isRunning()) {
        cancelAnimationFrame(rafId);
      } else{
        rafId = requestAnimationFrame(internalUpdate);
      }

      return app.state.toggleIsRunning();
    }
  };

  document.addEventListener('keydown', pauseApp, false);

  rafId = requestAnimationFrame(internalUpdate);

  return rafId;
};

const defaultClearColor = [0.4, 0.2, 0.6, 1.0];
const appState = {
  clearColor: defaultClearColor,
  isRunning: false,
  time: 0,
};

const createState = (internalState) => {
  const state = internalState;

  return {
    isRunning: () => state.isRunning,
    setIsRunning: isRunning => state.isRunning = isRunning,
    toggleIsRunning: () => state.isRunning = !state.isRunning,
    clearColor: () => state.clearColor,
    setClearColor: (r, g, b, a) => state.clearColor = [r, g, b, a],
  };
};

const createApp = (canvasId) => {
  const gl = getGlContext(canvasId);

  app.gl = gl;
  app.canvas = getCanvas(canvasId);
  app.run = runApp;
  app.state = createState(appState);
  app.extensions = [
    { 'vertex_array_object': (
      gl.getExtension('OES_vertex_array_object') ||
      gl.getExtension('MOZ_OES_vertex_array_object') ||
      gl.getExtension('WEBKIT_OES_vertex_array_object')
    ) },
  ];

  return app;
};

export default createApp;
