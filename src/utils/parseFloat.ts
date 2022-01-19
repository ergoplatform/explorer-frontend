export function parseFloat(float: any, val: number) {
  let str = float.toString();
  str = str.slice(0, str.indexOf('.') + val + 1);
  return Number(str);
}
