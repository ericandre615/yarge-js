import type { Camera } from './lib/camera';
export declare const createQuad: (gl: WebGLRenderingContext) => ({ position, color, width, height, }: {
    position?: number[] | undefined;
    color?: number[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
}) => {
    render: (camera: Camera) => void;
};
export default createQuad;
//# sourceMappingURL=create-quad.d.ts.map