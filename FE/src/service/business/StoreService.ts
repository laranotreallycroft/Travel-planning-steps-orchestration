import { Store } from 'redux';
import { Persistor } from 'redux-persist';

import { getPersistor, getStore } from 'service/business/RootBusinessStore';

export type IStoreValueChangeCallback<T = any> = (next: T, current: T) => void;
export type IStoreValueComparator<T = any> = (current: T, next: T) => boolean;

/** Class with static methods for controlled access to redux store. */
export default class StoreService {
  /** Returns instance of redux action store. */
  static getStore(): Store {
    return getStore();
  }

  /** Get store persistor. */
  static getPersistor(): Persistor {
    return getPersistor();
  }
}
