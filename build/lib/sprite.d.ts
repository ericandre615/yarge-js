export function createSprite(gl: any): ({ position, color, width, height, texture, imagePath, }: {
    position?: number[] | undefined;
    color?: number[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
    texture: any;
    imagePath?: string | undefined;
}) => Promise<{
    getVertices: () => {
        data: Float32Array;
        sizeInBytes: any;
        vertexAttribPointers: any;
    };
    texture: any;
    render: (camera: any) => void;
}>;
export default createSprite;
//# sourceMappingURL=sprite.d.ts.map