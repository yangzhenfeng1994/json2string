interface Iobject {
  [name: string | number | symbol]: any
}
const map = [
  { type: Number, str: "Number" },
  { type: Boolean, str: "Boolean" },
  { type: String, str: "String" },
  { type: Symbol, str: "Symbol" },
  { type: Array, str: "Array" },
  { type: Object, str: "Object" },
  { type: Date, str: "Date" },
  { type: Math, str: "Math" },
  { type: RegExp, str: "RegExp" },
];
const stringify = function (obj: Iobject) {
  return JSON.stringify(obj, function (key, value) {
    const isConstructor = map.find((item) => item.type === value);
    if (isConstructor) {
      return `_${isConstructor.str}_`;
    }
    if (value instanceof Function || typeof value === "function") {
      const fnBody = value.toString();
      if (fnBody.length < 8 || fnBody.substring(0, 8) !== "function") {
        // 箭头函数
        return `_NuFrRa_${fnBody}`;
      }
      return fnBody;
    }
    if (value instanceof RegExp) {
      return `_PxEgEr_${value}`;
    }
    return value;
  });
};
const parse = function (str: string, date2obj: boolean = false) {
  const iso8061 = date2obj
    ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
    : false;
  let result = {};
  try {
    result = JSON.parse(str, function (key, value) {
      const isConstructor = map.find((item) => `_${item.str}_` === value);
      if (isConstructor) {
        return isConstructor.type;
      }
      if (typeof value !== "string") {
        return value;
      }
      if (value.length < 8) {
        return value;
      }

      const prefix = value.substring(0, 8);

      if (iso8061 && value.match(iso8061)) {
        return new Date(value);
      }
      if (prefix === "function") {
        return eval(`(${value})`);
      }
      if (prefix === "_PxEgEr_") {
        return eval(value.slice(8));
      }
      if (prefix === "_NuFrRa_") {
        const tar = `(() => { return function fn${value.slice(8)} })()`;
        return eval(tar);
      }
      return value;
    });
  } catch (err) {
    console.error(err, str);
  }
  return result;
};
const clone = function (obj: Iobject, date2obj = false) {
  return parse(stringify(obj), date2obj);
};

export { stringify, parse, clone };
