export default renderer2d;
declare function renderer2d(gl: any): {
    beginScene: () => void;
    endScene: () => void;
    submit: (renderables: any) => void;
    render: (camera: any) => void;
};
//# sourceMappingURL=renderer2d.d.ts.map