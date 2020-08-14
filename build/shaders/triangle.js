export var vertexShader = "#version 100\n\nattribute vec3 a_position;\nattribute vec4 a_color;\n\nvarying vec4 v_color;\n\nvoid main() {\n  gl_Position = vec4(a_position, 1.0);\n  v_color = a_color;\n}\n";
export var fragmentShader = "#version 100\nprecision mediump float;\n\nvarying vec4 v_color;\n\nvoid main() {\n  gl_FragColor = vec4(v_color);\n}\n";
export default {
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
};
//# sourceMappingURL=triangle.js.map