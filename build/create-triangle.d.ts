import type { RGBA } from './lib/color';
import type { Camera } from './lib/camera';
declare type Position = [number, number, number];
export declare const createTriangle: (gl: WebGLRenderingContext) => (pos: Position, color: RGBA) => {
    render: (camera: Camera) => void;
};
export default createTriangle;
//# sourceMappingURL=create-triangle.d.ts.map