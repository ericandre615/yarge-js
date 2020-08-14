import './vendor/raf-polyfill.js';

import getGlContext from './lib/gl.js';

const getCanvas = (canvasId = ''): HTMLCanvasElement => document.getElementById(canvasId) as HTMLCanvasElement;

const PAUSE = 80;

type App = {
  gl: WebGLRenderingContext | undefined, // TODO: use Maybe/Option type instead
  canvas: HTMLCanvasElement | undefined,
  run: ((props: object) => Promise<number>) | undefined,
  state: object | undefined,
  extensions: [object], //?
}

const app: App = {
  gl: undefined,
  canvas: undefined,
  run: undefined,
  state: undefined,
  extensions: [{}],
};

const runApp = (app: any) =>  async ({
  // @ts-ignore
  update = (state) => state,
} = {}) => {
  let rafId = 0; // use 0 as "uninitialized" value because typescript is having problems with undefined in this case
  const { gl, canvas } = app;
  app.state.setIsRunning(true);

  const internalUpdate = (time: number) => {
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(...app.state.clearColor());
    gl.clear(gl.COLOR_BUFFER_BIT);

    update({ ...app.state, time });

    rafId = requestAnimationFrame(internalUpdate);
  };

  const pauseApp = (e: KeyboardEvent) => {
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

type ClearColor = [number, number, number, number];

const defaultClearColor: ClearColor = [0.4, 0.2, 0.6, 1.0];
type AppState = {
  clearColor: ClearColor,
  isRunning: boolean,
  time: number,
};

const appState: AppState = {
  clearColor: defaultClearColor,
  isRunning: false,
  time: 0,
};

type GenericObject<T> = T & { [key: string]: unknown };
type InternalState = GenericObject<{
  clearColor: [number, number, number, number],
  isRunning: boolean,
  time: number
}>;

const createState = (internalState: InternalState) => {
  const state = internalState;

  return {
    isRunning: () => state.isRunning,
    setIsRunning: (isRunning: boolean) => state.isRunning = isRunning,
    toggleIsRunning: () => state.isRunning = !state.isRunning,
    clearColor: () => state.clearColor,
    setClearColor: (r: number , g: number, b: number, a: number) => state.clearColor = [r, g, b, a],
  };
};

const createApp = (canvasId = '') => {
  const gl = getGlContext(canvasId);

  app.gl = gl;
  app.canvas = getCanvas(canvasId) || undefined; // TODO: why? because DOM API types and the functions for them may return null? Shouldn't that be considered in TS's built in DOM API Types?
  app.run = runApp(app);
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
