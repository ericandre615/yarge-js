declare type Matrix4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
declare type Position = [number, number, number];
export interface Camera {
    getProjection: () => Matrix4;
    getPosition: () => Position;
    setPosition: (x: number, y: number, z: number) => void;
    updateViewport: (w: number, h: number) => void;
    getView: () => Matrix4;
    getWidth: () => number;
    getHeight: () => number;
    getDimensions: () => [number, number];
    getViewProjection: () => Matrix4;
}
declare const createCamera: (width: number | undefined, height: 0.0, kind?: string) => Camera;
export default createCamera;
//# sourceMappingURL=camera.d.ts.map