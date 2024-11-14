/** Used for wrapping different value sources under the same interface. */
// tslint:disable-next-line: interface-name
export interface ConfigValueContainer<T> {
  value(): T;
}

/** Default impl of config value container. This impl simply holds and returns given value. */
export class DefaultConfigValueContainer<T> implements ConfigValueContainer<T> {
  constructor(private state: T) {}

  value(): T {
    return this.state;
  }
}
