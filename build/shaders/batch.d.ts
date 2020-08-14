export const vertexShader: "#version 100\n\nattribute vec3 a_position;\nattribute vec2 a_uv;\nattribute vec4 a_color;\nattribute float a_textureIndex;\nattribute vec3 a_textureTransform;\nattribute vec3 a_textureScale;\n\nuniform mat4 mvp;\n\nvarying vec2 v_uv;\nvarying vec4 v_color;\nvarying float v_textureIndex;\n\nvoid main() {\n  gl_Position = mvp * vec4(a_position, 1.0);\n  v_color = a_color;\n  v_textureIndex = a_textureIndex;\n\n  // this works, but is very weird and manual\n  mat4 TexTransform = mat4(\n    vec4( a_textureScale.x, 0.0, 0.0, 0.0),\n    vec4( 0.0, a_textureScale.y, 0.0, 0.0),\n    vec4( 0.0, 0.0, a_textureScale.z, 0.0),\n    vec4( a_textureTransform,         1.0));\n  v_uv = vec2(a_textureTransform * vec4(v_uv, 1.0, 1.0));\n}\n";
export function createFragmentShader(max_textures: any): string;
declare namespace _default {
    export { vertexShader };
    export { createFragmentShader };
}
export default _default;
//# sourceMappingURL=batch.d.ts.map