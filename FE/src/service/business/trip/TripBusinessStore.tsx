import { ILocation } from 'model/geometry/Coordinates';
import { ITrip } from 'model/trip/Trip';
import { Observable, filter, from, map, mergeMap, of, switchMap } from 'rxjs';
import { IIdPayload, IPayloadAction } from 'service/business/common/types';
import { tripListStore } from 'service/business/trip/TripListBusinessStore';
import EntityApiService from 'service/business/utils';
import LocalizeService from 'service/util/localize/LocalizeService';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

export interface ITripCreatePayload {
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
}

export interface ITripUpdatePayload extends ITripCreatePayload {
  id: string;
}

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

export const tripUpdate = (payload: ITripUpdatePayload): IPayloadAction<ITripUpdatePayload> => {
  return { type: actions.TRIP_UPDATE, payload: payload };
};

export const tripDelete = (payload: IIdPayload): IPayloadAction<IIdPayload> => {
  return { type: actions.TRIP_DELETE, payload: payload };
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
            if (response.status === 200) {
              notificationService.success(LocalizeService.translate('TRIP_BUSINESS_STORE.CREATE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('TRIP_BUSINESS_STORE.CREATE.ERROR'));
          })
      ).pipe(trackAction(action));
    }),

    map((data) => tripListStore(data))
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
            notificationService.error(LocalizeService.translate('TRIP_BUSINESS_STORE.FETCH.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    map((data) => tripStore(data))
  );
};

const tripUpdateffect = (action$: Observable<IPayloadAction<ITripUpdatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/trips/${action.payload.id}`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success(LocalizeService.translate('TRIP_BUSINESS_STORE.UPDATE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('TRIP_BUSINESS_STORE.UPDATE.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    map((data) => tripStore(data))
  );
};

const tripDeleteffect = (action$: Observable<IPayloadAction<IIdPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_DELETE;
    }),
    mergeMap((action) => {
      const tripId = action.payload.id;
      return from(
        EntityApiService.deleteEntity(`/trips/${tripId}`)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('TRIP_BUSINESS_STORE.DELETE.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
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
