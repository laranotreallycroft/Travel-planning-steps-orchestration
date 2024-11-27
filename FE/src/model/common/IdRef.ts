/**
 * Describes ID reference instead of full referenced object.
 *
 * Sometimes properties in an object can reference another object but that object is not resolved (eg. performance reasons).
 * Then these objects are reprensented with an object containing only "id" property of referenced object. Then this interface
 * can be used to avoid hardcoding that property's type.
 */
export interface IIdRef<T = string | number> {
  id: T;
}
