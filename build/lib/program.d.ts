export default createProgram;
declare function createProgram(gl: any): (vertexShaderSource: any, fragmentShaderSource: any) => {
    id: any;
    getAttribLocation: (name: any) => any;
    getUniformLocation: (name: any) => any;
    setUniform1i: (location: any, value: any) => any;
    setUniform4f: (location: any, value: any) => any;
    setUniformMat4f: (location: any, value: any) => void;
    setUsed: () => any;
};
//# sourceMappingURL=program.d.ts.map