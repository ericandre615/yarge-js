import type { AnyObject } from './types/generic';
import type { ShaderProgram } from './program';

import {
  isString as checkString,
  isNumber as checkNumber
} from './quack.js';

const isString = (s: any) => checkString(s) && isNaN(s);
const isNumber = (n: any) => checkNumber(n) && !isNaN(n);

const byteSize = 4; // float32 byte size

const getSizeInBytes = (data: Float32Array) => (data.length * data.BYTES_PER_ELEMENT);

type VertexData = {
  data: Float32Array,
  sizeInBytes: number,
  vertexAttribPointers: (program: ShaderProgram) => void,
}

type VerticesData = Array<VertexData>;

export const vertex = (gl: WebGLRenderingContext) => (vertexData: AnyObject): VertexData => {
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
          : program.getAttribLocation(attribute) as GLint;
        const normalized = false;
        const stride = getSizeInBytes(data);
        const offset = i == 0
          ? 0
          : vertexData[attrs[i - 1]].length * byteSize || 0;// the previous element's data length

        gl.enableVertexAttribArray(attr as GLint);
        gl.vertexAttribPointer(attr as GLint, attrData.length, gl.FLOAT, normalized, stride, offset);
      });
    },
  }
};

export const vertexArray = (vertices: VerticesData) => ({
  // TODO: dive more deeply into this ts issue
  // Type 'Float32Array' is not an array type or does not have a '[Symbol.iterator]()' method that returns an iterator
  // @ts-ignore
  data: new Float32Array(vertices.reduce((acc, { data }) => acc.concat(...data), [])),
  sizeInBytes: vertices[0].sizeInBytes,
  vertexAttribPointers: vertices[0].vertexAttribPointers,
});

export default {
  vertex,
  vertexArray
};

