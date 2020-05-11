const identity = () => ([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);

const ortho = (left, right, bottom, top, znear = -1, zfar = 1) => {
  const id = identity();
  const two = 2.0;

  return [
    (two / right - left), id[1], id[2], id[3],
    id[4], two / (top - bottom), id[6], id[7],
    id[8], id[9], -two / (zfar - znear), id[11],
    (right + left) / (left - right), (top + bottom) / (bottom - top), (zfar + znear) / (znear - zfar), id[15],
  ];
};

const translate = (mat4 = glm.indentity(), vec3 = [0.0, 0.0, 0.0]) => {
  const [x, y, z, w] = [...vec3, 1.0];
  const transMat = [
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, w
  ];

  return mat.multiplyMatrix4(mat4, transMat);
};

const translateMat4 = (mat4 = identity(), vec3) => {
    const m = [...mat4];

    const v0 = vec3[0];
    const v1 = vec3[1];
    const v2 = vec3[2];
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[1 * 4 + 0];
    const m11 = m[1 * 4 + 1];
    const m12 = m[1 * 4 + 2];
    const m13 = m[1 * 4 + 3];
    const m20 = m[2 * 4 + 0];
    const m21 = m[2 * 4 + 1];
    const m22 = m[2 * 4 + 2];
    const m23 = m[2 * 4 + 3];
    const m30 = m[3 * 4 + 0];
    const m31 = m[3 * 4 + 1];
    const m32 = m[3 * 4 + 2];
    const m33 = m[3 * 4 + 3];

    m[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    m[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    m[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    m[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

    return m;
}

const translation = (mat4 = identity(), vec3) => {
  const dst = [];

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = vec3[0];
  dst[13] = vec3[1];
  dst[14] = vec3[2];
  dst[15] = 1;

  return dst;
};

const multMat4RowM = (a, b) => {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[ 4 + 0];
  const a11 = a[ 4 + 1];
  const a12 = a[ 4 + 2];
  const a13 = a[ 4 + 3];
  const a20 = a[ 8 + 0];
  const a21 = a[ 8 + 1];
  const a22 = a[ 8 + 2];
  const a23 = a[ 8 + 3];
  const a30 = a[12 + 0];
  const a31 = a[12 + 1];
  const a32 = a[12 + 2];
  const a33 = a[12 + 3];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[ 4 + 0];
  const b11 = b[ 4 + 1];
  const b12 = b[ 4 + 2];
  const b13 = b[ 4 + 3];
  const b20 = b[ 8 + 0];
  const b21 = b[ 8 + 1];
  const b22 = b[ 8 + 2];
  const b23 = b[ 8 + 3];
  const b30 = b[12 + 0];
  const b31 = b[12 + 1];
  const b32 = b[12 + 2];
  const b33 = b[12 + 3];

  const dst = [];

  dst[ 0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
  dst[ 1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
  dst[ 2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
  dst[ 3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
  dst[ 4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
  dst[ 5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
  dst[ 6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
  dst[ 7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
  dst[ 8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
  dst[ 9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
  dst[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
  dst[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
  dst[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
  dst[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
  dst[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
  dst[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

  return dst;
};

const multMat4ColM = (a, b) => {
 const  a00 = a[0];
 const  a01 = a[1];
 const  a02 = a[2];
 const  a03 = a[3];
 const  a10 = a[ 4 + 0];
 const  a11 = a[ 4 + 1];
 const  a12 = a[ 4 + 2];
 const  a13 = a[ 4 + 3];
 const  a20 = a[ 8 + 0];
 const  a21 = a[ 8 + 1];
 const  a22 = a[ 8 + 2];
 const  a23 = a[ 8 + 3];
 const  a30 = a[12 + 0];
 const  a31 = a[12 + 1];
 const  a32 = a[12 + 2];
 const  a33 = a[12 + 3];
 const  b00 = b[0];
 const  b01 = b[1];
 const  b02 = b[2];
 const  b03 = b[3];
 const  b10 = b[ 4 + 0];
 const  b11 = b[ 4 + 1];
 const  b12 = b[ 4 + 2];
 const  b13 = b[ 4 + 3];
 const  b20 = b[ 8 + 0];
 const  b21 = b[ 8 + 1];
 const  b22 = b[ 8 + 2];
 const  b23 = b[ 8 + 3];
 const  b30 = b[12 + 0];
 const  b31 = b[12 + 1];
 const  b32 = b[12 + 2];
 const  b33 = b[12 + 3];

  const dst = [];

  dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
  dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
  dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
  dst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
  dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
  dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
  dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
  dst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
  dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
  dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

  return dst;
};

const mat = ({
  multiplyScalar: (n, m) => m.map(p => n * p),
  multiplyMatrix4: (m1, m2) => ([
    m1[0] * m2[0] + m1[1] * m2[4] + m1[2] * m2[8] + m1[3] * m2[12],
    m1[0] * m2[1] + m1[1] * m2[5] + m1[2] * m2[9] + m1[3] * m2[13],
    m1[0] * m2[2] + m1[1] * m2[6] + m1[2] * m2[10] + m1[3] * m2[14],
    m1[0] * m2[3] + m1[1] * m2[7] + m1[2] * m2[11] + m1[3] * m2[15],

    m1[4] * m2[0] + m1[5] * m2[4] + m1[6] * m2[8] + m1[7] * m2[12],
    m1[4] * m2[1] + m1[5] * m2[5] + m1[6] * m2[9] + m1[7] * m2[13],
    m1[4] * m2[2] + m1[5] * m2[6] + m1[6] * m2[10] + m1[7] * m2[14],
    m1[4] * m2[3] + m1[5] * m2[7] + m1[6] * m2[11] + m1[7] * m2[15],

    m1[8] * m2[0] + m1[9] * m2[4] + m1[10] * m2[8] + m1[11] * m2[12],
    m1[8] * m2[1] + m1[9] * m2[5] + m1[10] * m2[9] + m1[11] * m2[13],
    m1[8] * m2[2] + m1[9] * m2[6] + m1[10] * m2[10] + m1[11] * m2[14],
    m1[8] * m2[3] + m1[9] * m2[7] + m1[10] * m2[11] + m1[11] * m2[15],

    m1[12] * m2[0] + m1[13] * m2[4] + m1[14] * m2[8] + m1[15] * m2[12],
    m1[12] * m2[1] + m1[13] * m2[5] + m1[14] * m2[9] + m1[15] * m2[13],
    m1[12] * m2[2] + m1[13] * m2[6] + m1[14] * m2[10] + m1[15] * m2[14],
    m1[12] * m2[3] + m1[13] * m2[7] + m1[14] * m2[11] + m1[15] * m2[15],
  ]),
  multMat4: (m1, m2) => {
    const cols = 4;
    const m1md = createMultiDimensionalMat(m1, cols);
    const m2md = createMultiDimensionalMat(m2, cols);
    const mm = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < m1md.length; i++) {
      for (let j = 0; j < m2md[0].length; j++) {
        for (let k = 0; k < m2md.length; k++) {
          mm[i][j] += m1md[i][k] * m2md[k][j];
        }
      }
    }

    return flatMat(mm);
  },
  multMat4R: (m1, m2) => {
    const cols = 4;
    const m1md = createMultiDimensionalMat(m1, cols);
    const m2md = createMultiDimensionalMat(m2, cols);
    const mm = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < m1md.length; i++) {
      for (let j = 0; j < m2md[0].length; j++) {
        for (let k = 0; k < m2md.length; k++) {
          mm[i][j] = m1md[i][j] * m2md[j][k];
        }
      }
    }

    return flatMat(mm);
  }
});

const createMultiDimensionalMat = (m, cols = 4) => {
  const m2 = [];

  for (let i = 0; i < m.length; i += cols) {
    m2.push([
      m[i], m[i + 1], m[i + 2], m[i + 3]
    ]);
  }

  return m2;
}

const flatMat = m => m.reduce((acc, val) => acc.concat(val), []);

export default {
  ortho,
  identity,
  translate,
  mat,
  multMat4RowM,
  multMat4: multMat4ColM,//this one works best multMat4ColM,
  translateMat4,
  translation,
};
