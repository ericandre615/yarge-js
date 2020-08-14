export function createTexture(gl: any): (imagePath?: string, options?: {}) => Promise<{
    textureId: any;
    getDimensions: () => any[];
    bind: () => any;
    bindToUnit: (unit: any) => void;
    unbind: () => any;
    detach: () => any;
}>;
export default createTexture;
//# sourceMappingURL=texture.d.ts.map