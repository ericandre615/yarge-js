export var vertexShader = "#version 100\n\nattribute vec3 a_position;\nattribute vec2 a_uv;\nattribute vec4 a_color;\nattribute float a_textureIndex;\nattribute vec3 a_textureTransform;\nattribute vec3 a_textureScale;\n\nuniform mat4 mvp;\n\nvarying vec2 v_uv;\nvarying vec4 v_color;\nvarying float v_textureIndex;\n\nvoid main() {\n  gl_Position = mvp * vec4(a_position, 1.0);\n  v_color = a_color;\n  v_textureIndex = a_textureIndex;\n\n  // this works, but is very weird and manual\n  mat4 TexTransform = mat4(\n    vec4( a_textureScale.x, 0.0, 0.0, 0.0),\n    vec4( 0.0, a_textureScale.y, 0.0, 0.0),\n    vec4( 0.0, 0.0, a_textureScale.z, 0.0),\n    vec4( a_textureTransform,         1.0));\n  v_uv = vec2(a_textureTransform * vec4(v_uv, 1.0, 1.0));\n}\n";
export var createFragmentShader = function (max_textures) {
    var texture_switches = [];
    for (var i = 0; i < max_textures; i++) {
        texture_switches.push("\n  case  " + i + ":\n    texColor = texture2D(u_textures[" + i + "u], v_uv) * v_color;\n    break;\n  ");
    }
    return "#version 100\nprecision mediump float;\n\nuniform sampler2D u_textures[" + max_textures + "];\n\nvarying vec4 v_color;\nvarying vec2 v_uv;\nvarying float v_textureIndex;\n\nvoid main() {\n  //gl_FragColor = texture2D(u_texture, u_uv) * vec4(v_color);\n  int ttid = int(v_textureIndex + 0.5);\n  vec4 baseColor = v_color; //vec4(IN.TexColor.x, IN.TexColor.y, IN.TexColor.z, IN.TexColor.w);\n  vec4 texColor = baseColor;\n\n  switch (ttid)\n  {\n      " + texture_switches.join('') + "\n      default:\n          texColor = baseColor;\n          break;\n  }\n\n  gl_FragColor = texColor;\n}";
};
export default {
    vertexShader: vertexShader,
    createFragmentShader: createFragmentShader,
};
//# sourceMappingURL=batch.js.map