interface Iobject {
    [name: string | number | symbol]: any;
}
declare const stringify: (obj: Iobject) => string;
declare const parse: (str: string, date2obj?: boolean) => {};
declare const clone: (obj: Iobject, date2obj?: boolean) => {};
export { stringify, parse, clone };
