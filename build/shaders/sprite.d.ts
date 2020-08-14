export const vertexShader: "#version 100\n\nattribute vec3 a_position;\nattribute vec4 a_color;\nattribute vec2 a_uv;\n\nuniform mat4 mvp;\n\nvarying vec2 v_uv;\nvarying vec4 v_color;\n\nvoid main() {\n  gl_Position = mvp * vec4(a_position, 1.0);\n  v_color = a_color;\n  v_uv = a_uv;\n}\n";
export const fragmentShader: "#version 100\nprecision mediump float;\n\nvarying vec4 v_color;\nvarying vec2 v_uv;\n\nuniform sampler2D u_texture;\n\n//uniform vec4 u_color;\n\nvoid main() {\n  vec4 use_color = v_color.xyzw;\n  // TODO: I'm getting a weird bug/issue/behavior here. It just won't work\n  // when trying to use even a single component from the v_color with the texture,\n  // hard coding works,\n  // using v_color without the texture works. Its frustrating and confusing\n  // and I just need to move on, for now\n  //gl_FragColor = vec4(use_color.xyzw);\n  gl_FragColor = texture2D(u_texture, v_uv);// * vec4(v_color.xyz, 1);\n}\n";
declare namespace _default {
    export { vertexShader };
    export { fragmentShader };
}
export default _default;
//# sourceMappingURL=sprite.d.ts.map