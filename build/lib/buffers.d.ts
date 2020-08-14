export function createVertexArray(gl: any): {
    bufferId: any;
    bind: () => any;
    unbind: () => any;
    detach: () => any;
};
export function createDynamicArrayBuffer(gl: any): {
    bufferId: any;
    bind: () => any;
    unbind: () => any;
    detach: () => any;
    setBufferOffse: (offset: any) => void;
    resetBufferOffset: () => void;
    getBufferOffset: () => number;
    setBufferData: (maxBufferSize: any) => void;
    uploadDrawData: (data: any) => void;
};
export function createArrayBuffer(gl: any): {
    bufferId: any;
    bind: () => any;
    unbind: () => any;
    detach: () => any;
    staticDrawData: (bufferData: any) => void;
};
export function createElementArrayBuffer(gl: any): {
    bufferId: any;
    bind: () => any;
    unbind: () => any;
    detach: () => any;
    staticDrawData: (bufferData: any) => void;
};
declare namespace _default {
    export { createArrayBuffer };
    export { createElementArrayBuffer };
    export { createVertexArray };
}
export default _default;
//# sourceMappingURL=buffers.d.ts.map