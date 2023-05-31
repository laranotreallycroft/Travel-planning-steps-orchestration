import { Action } from "redux";
import {
  ITrackableObject,
  TrackingHelper,
  createTrackableObject,
} from "./tracking";
import { Observable, Observer } from "rxjs";

export interface IAction extends Action<String> {}
// callback action object type
export type ITrackableAction<T = any> = IAction & ITrackableObject<T>;

/** Enhance action object with event tracker. */
export const createTrackableAction = <T>(
  action: IAction,
  trackingParent?: any
): ITrackableAction<T> => {
  return createTrackableObject<IAction>(action, trackingParent);
};

/** Tracking action RxJS operator which takes care of simple success/error handling and tracking it back through tracking chain. */
const trackAction = (action: IAction) => {
  // create and return pure operator function
  return <T>(source: Observable<T>): Observable<T> => {
    return Observable.create((subscriber: Observer<T>) => {
      return source.subscribe(
        (data: T) => {
          try {
            subscriber.next(data);
            TrackingHelper.success(action, data);
          } catch (err) {
            subscriber.error(err);
            TrackingHelper.error(action, err);
          }
        },
        (err) => {
          subscriber.error(err);
          TrackingHelper.error(action, err);
        },
        () => {
          subscriber.complete();
        }
      );
    });
  };
};

export default trackAction;
