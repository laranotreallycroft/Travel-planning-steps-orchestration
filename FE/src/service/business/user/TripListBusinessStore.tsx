import { ITrip } from 'model/trip/Trip';
import { Observable, filter, from, map, mergeMap } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import EntityApiService from 'service/business/utils';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

export interface ITripListFilter {
  upcomingOnly?: boolean;
  pastOnly?: boolean;
}
// -
// -------------------- Selectors
const getTripList = (store: any): ITrip[] => store.tripList;

// -
// -------------------- Actions
const actions = {
  TRIP_LIST_FETCH: 'TRIP_LIST_FETCH',
  TRIP_LIST_STORE: 'TRIP_LIST_STORE',
  TRIP_LIST_CLEAR: 'TRIP_LIST_CLEAR',
};

export const tripListFetch = (listFilter: ITripListFilter): IPayloadAction<ITripListFilter> => {
  return { type: actions.TRIP_LIST_FETCH, payload: listFilter };
};

export const tripListStore = (payload: ITrip[]): IPayloadAction<ITrip[]> => {
  return { type: actions.TRIP_LIST_STORE, payload: payload };
};

const tripListClear = (): IAction => {
  return { type: actions.TRIP_LIST_CLEAR };
};

// -
// -------------------- Side-effects

const tripListFetchEffect = (action$: Observable<IPayloadAction<ITripListFilter>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => action.type === actions.TRIP_LIST_FETCH),

    mergeMap((action) => {
      return from(
        EntityApiService.getEntity(`/trips`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to fetch trip list', error.response.data);
          })
      ).pipe(trackAction(action));
    }),

    filter((data) => data !== undefined),
    map((data) => tripListStore(data))
  );
};

// -
// -------------------- Reducers

const tripList = (state: any = null, action: IPayloadAction<ITrip[]>) => {
  if (action.type === actions.TRIP_LIST_STORE) {
    return [...action.payload];
  } else if (action.type === actions.TRIP_LIST_CLEAR) {
    return null;
  }
  return state;
};

export const TripListBusinessStore = {
  selectors: { getTripList },
  actions: { tripListFetch, tripListStore, tripListClear },
  effects: { tripListFetchEffect },
  reducers: { tripList },
};
