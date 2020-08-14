declare namespace _default {
    export { ortho };
    export { identity };
    export { translate };
    export { mat };
    export { multMat4RowM };
    export { multMat4ColM as multMat4 };
    export { translateMat4 };
    export { translation };
}
export default _default;
declare function ortho(left: any, right: any, bottom: any, top: any, znear?: number, zfar?: number): number[];
declare function identity(): number[];
declare function translate(mat4?: any, vec3?: number[]): number[];
declare namespace mat {
    export function multiplyScalar(n: any, m: any): any;
    export function multiplyMatrix4(m1: any, m2: any): number[];
    export function multMat4(m1: any, m2: any): any;
    export function multMat4R(m1: any, m2: any): any;
}
declare function multMat4RowM(a: any, b: any): number[];
declare function multMat4ColM(a: any, b: any): number[];
declare function translateMat4(mat4: number[] | undefined, vec3: any): number[];
declare function translation(mat4: number[] | undefined, vec3: any): any[];
//# sourceMappingURL=glm.d.ts.map