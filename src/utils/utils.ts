export function toPureJson(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
