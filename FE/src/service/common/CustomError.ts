/**
 * Error base class that should be used for all other custom errors.
 * It manually sets message and name properties. Name property is set from:
 *  - name argument or
 *  - constructor.name if it's available, or
 *  - "CustomError"
 */
export default class Error {
  name: string;
  message: string;
  stack?: string;

  constructor(message: string, name?: string) {
    this.message = message;
    this.name = name || (this.constructor as any).name || "CustomError";
    this.stack = new Error(message, name).stack;
  }
}
