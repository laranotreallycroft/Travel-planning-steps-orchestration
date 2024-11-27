export class LangUtils {
  static isEmpty(obj: any): obj is null | undefined {
    return obj === void 0 || obj === null;
  }

  static isFunction(obj: any): obj is Function {
    return obj instanceof Function;
  }
  static isArray(obj: any): obj is any[] {
    return Array.isArray(obj);
  }

  static isJsObject(o: any): boolean {
    return !LangUtils.isEmpty(o) && (LangUtils.isFunction(o) || typeof o === 'object');
  }
}
