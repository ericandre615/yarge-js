const duckType = t => Object.prototype.toString.call(t);
const isString = v => (
  duckType(v) == '[object String]' && isNaN(v)
);
const isNumber = v => (
  duckType(v) == '[object Number]' && !isNaN(v)
);
const byteSize = 4; // float32 byte size

const getSizeInBytes = data => (data.length * data.BYTES_PER_ELEMENT);

export const vertex = gl => (vertexData) => {
  const data = new Float32Array(
    Object.keys(vertexData).reduce((acc, curr) => acc.concat(...vertexData[curr]), [])
  );

  return {
    data,
    sizeInBytes: getSizeInBytes(data),
    vertexAttribPointers: (program) => {
      return Object.keys(vertexData).forEach((attribute, i, attrs) => {
        const attrData = new Float32Array(vertexData[attribute]);
        const attr = isNumber(parseInt(attribute, 10))
          ? attribute
          : program.getAttribLocation(attribute);
        const normalized = false;
        const stride = getSizeInBytes(data);
        const offset = i == 0
          ? 0
          : vertexData[attrs[i - 1]].length * byteSize || 0;// the previous element's data length

        gl.enableVertexAttribArray(attr);
        gl.vertexAttribPointer(attr, attrData.length, gl.FLOAT, normalized, stride, offset);
      });
    },
  }
};

export const vertexArray = vertices => ({
  data: new Float32Array(vertices.reduce((acc, { data }) => acc.concat(...data), [])),
  sizeInBytes: vertices[0].sizeInBytes,
  vertexAttribPointers: vertices[0].vertexAttribPointers,
});

export default {
  vertex,
  vertexArray
};

