/**
 * Function serializes object of CSS class names to string of concatenated names.
 * Object keys are CSS class names and object values are boolean values which determin if specific class
 * will be serialized. eg.
 *
 * Input object
 * {
 *   "class1": true,
 *   "class2": false,
 *   "class3": true
 * }
 *
 * Output string:
 * "class1 class3"
 *
 * @param {object} classObj object with class names
 *
 * @returns {string} string with concatenated class names
 */
export function classNames(classObj: { [name: string]: boolean }): string {
  return Object.keys(classObj).reduce((accum, className) => {
    if (classObj[className]) {
      accum += (accum ? ' ' : '') + className;
    }
    return accum;
  }, '');
}
