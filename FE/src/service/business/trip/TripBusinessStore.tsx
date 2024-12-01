import { ITrip, ITripCreatePayload } from 'model/trip/Trip';
import { Observable, filter, from, ignoreElements, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { IIdPayload, IPayloadAction } from 'service/business/common/types';
import { tripListStore } from 'service/business/user/TripListBusinessStore';
import EntityApiService from 'service/business/utils';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

// -
// -------------------- Selectors
export const getTrip = (store: any): ITrip => store.trip;

// -
// -------------------- Actions
const actions = {
  TRIP_CREATE: 'TRIP_CREATE',
  TRIP_FETCH: 'TRIP_FETCH',
  TRIP_UPDATE: 'TRIP_UPDATE',
  TRIP_DELETE: 'TRIP_DELETE',
  TRIP_STORE: 'TRIP_STORE',
  TRIP_CLEAR: 'TRIP_CLEAR',
};

export const tripCreate = (payload: ITripCreatePayload): IPayloadAction<ITripCreatePayload> => {
  return { type: actions.TRIP_CREATE, payload: payload };
};

export const tripFetch = (payload: IIdPayload): IPayloadAction<IIdPayload> => {
  return { type: actions.TRIP_FETCH, payload: payload };
};

export const tripUpdate = (payload: ITripCreatePayload): IPayloadAction<ITripCreatePayload> => {
  return { type: actions.TRIP_UPDATE, payload: payload };
};

export const tripDelete = (): IAction => {
  return { type: actions.TRIP_DELETE };
};

export const tripStore = (payload: ITrip): IPayloadAction<ITrip> => {
  return { type: actions.TRIP_STORE, payload: payload };
};

export const tripClear = (): IAction => {
  return { type: actions.TRIP_CLEAR };
};

// -
// -------------------- Side-effects

const tripCreateEffect = (action$: Observable<IPayloadAction<ITripCreatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_CREATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.postEntity('/trips', action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success('New trip successfully created');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to create trip', error.response.data);
          })
      ).pipe(trackAction(action));
    }),

    ignoreElements()
  );
};

const tripFetchEffect = (action$: Observable<IPayloadAction<IIdPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_FETCH;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.getEntity(`/trips/${action.payload.id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to fetch trip data', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data))
  );
};

const tripUpdateffect = (action$: Observable<IPayloadAction<ITripCreatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        EntityApiService.putEntity('/trips/' + trip.id, action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success('Trip successfully changed');
              return {
                tripList: response.data,
                trip: response.data.find((tripPayload: ITrip) => tripPayload.id === trip.id),
              };
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update trip', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) => of(tripListStore(data?.tripList), tripStore(data?.trip)))
  );
};
const tripDeleteffect = (action$: Observable<IAction>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_DELETE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        EntityApiService.deleteEntity('/trips/' + trip.id)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update trip', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) => of(tripListStore(data), tripClear()))
  );
};
// -
// -------------------- Reducers

const trip = (state: any = null, action: IPayloadAction<ITrip>) => {
  if (action.type === actions.TRIP_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.TRIP_CLEAR) {
    return null;
  }
  return state;
};

export const TripBusinessStore = {
  selectors: { getTrip },
  actions: {
    tripCreate,
    tripFetch,
    tripUpdate,
    tripDelete,
    tripStore,
    tripClear,
  },
  effects: {
    tripCreateEffect,
    tripFetchEffect,
    tripUpdateffect,
    tripDeleteffect,
  },
  reducers: { trip },
};
