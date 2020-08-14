import './vendor/raf-polyfill.js';
declare type App = {
    gl: WebGLRenderingContext | undefined;
    canvas: HTMLCanvasElement | undefined;
    run: ((props: object) => Promise<number>) | undefined;
    state: object | undefined;
    extensions: [object];
};
declare const createApp: (canvasId?: string) => App;
export default createApp;
//# sourceMappingURL=app.d.ts.map