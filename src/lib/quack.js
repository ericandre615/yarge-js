export const duckType = t => Object.prototype.toString.call(t);
export const checkType = t => v => t === duckType(v);
export const isString = v => checkType('[object String]')(v);
export const isNumber = v => checkType('[object Number]')(v);

export default {
  duckType,
  checkType,
  isString,
  isNumber,
}
