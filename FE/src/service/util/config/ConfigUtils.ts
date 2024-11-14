import { NamespaceHelper } from "service/util/config/NamespaceHelper";

/** Utility functions for handling nested config values. */
export class ConfigUtils {
  static joinPath(...parts: string[]): string {
    return NamespaceHelper.joinParts(parts);
  }

  static splitPath(path: string): string[] {
    return NamespaceHelper.splitParts(path);
  }

  static reducePath(state: any, selector: string | string[]) {
    const path: string[] = Array.isArray(selector)
      ? selector
      : NamespaceHelper.splitParts(selector);

    // ignore empty paths
    if (!path || path.length === 0) {
      return undefined;
    }

    return path.reduce((current, key, index) => {
      return current !== undefined ? current[key] : undefined;
    }, state);
  }
}
