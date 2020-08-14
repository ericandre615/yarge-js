export const vertexShader: "#version 100\n\nattribute vec3 a_position;\nattribute vec4 a_color;\n\nuniform mat4 mvp;\n\nvarying vec4 v_color;\n\nvoid main() {\n  gl_Position = mvp * vec4(a_position, 1.0);\n  v_color = a_color;\n}\n";
export const fragmentShader: "#version 100\nprecision mediump float;\n\nvarying vec4 v_color;\n\nvoid main() {\n  gl_FragColor = vec4(v_color);\n}\n";
declare namespace _default {
    export { vertexShader };
    export { fragmentShader };
}
export default _default;
//# sourceMappingURL=quad.d.ts.map