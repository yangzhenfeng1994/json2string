interface Iobject {
    [name: string | number | symbol]: any;
}
declare const stringify: (obj: Iobject) => string;
declare const parse: (str: string, date2obj?: boolean) => Iobject;
declare const clone: (obj: T, date2obj?: boolean) => T;
export { stringify, parse, clone };
