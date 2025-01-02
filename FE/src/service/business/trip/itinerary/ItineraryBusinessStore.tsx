import { ILocation } from 'model/geometry/Coordinates';

import { Observable, catchError, filter, from, map, mergeMap, withLatestFrom } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { getTrip, tripStore } from 'service/business/trip/TripBusinessStore';
import EntityApiService from 'service/business/utils';
import LocalizeService from 'service/util/localize/LocalizeService';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

export interface IItineraryElementPayload {
  id: string;
  location: ILocation;
  duration: number;
  start: boolean;
}

export interface IItineraryForm {
  stops: IItineraryElementPayload[];
  optimize: boolean;
  transportationMethod: string;
}
export interface IItineraryPayload extends IItineraryForm {
  tripId: string;
}

export interface IScheduleElement {
  id: string;
  startDate: string;
  endDate: string;
}

// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  ITINERARY_CREATE: 'ITINERARY_CREATE',
  ITINERARY_UPDATE: 'ITINERARY_UPDATE',
  ITINERARY_SCHEDULE_UPDATE: 'ITINERARY_SCHEDULE_UPDATE',
  ITINERARY_DELETE: 'ITINERARY_DELETE',
};

export const itineraryCreate = (payload: IItineraryPayload): IPayloadAction<IItineraryPayload> => {
  return { type: actions.ITINERARY_CREATE, payload: payload };
};

export const itineraryUpdate = (payload: IItineraryPayload): IPayloadAction<IItineraryPayload> => {
  return { type: actions.ITINERARY_UPDATE, payload: payload };
};

export const itineraryScheduleUpdate = (payload: IScheduleElement[]): IPayloadAction<IScheduleElement[]> => {
  return { type: actions.ITINERARY_SCHEDULE_UPDATE, payload: payload };
};
export const itineraryDelete = (): IAction => {
  return { type: actions.ITINERARY_DELETE };
};

// -
// -------------------- Side-effects

const itineraryCreateEffect = (action$: Observable<IPayloadAction<IItineraryPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_CREATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.postEntity(`/itineraries`, action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success(LocalizeService.translate('ITINERARY_BUSINESS_STORE.CREATE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('ITINERARY_BUSINESS_STORE.CREATE.ERROR'));
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    map((data) => tripStore(data)),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};

const itineraryUpdateEffect = (action$: Observable<IPayloadAction<IItineraryPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/itineraries`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success(LocalizeService.translate('ITINERARY_BUSINESS_STORE.UPDATE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('ITINERARY_BUSINESS_STORE.UPDATE.ERROR'));
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    map((data) => tripStore(data)),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};
const itineraryScheduleUpdateEffect = (action$: Observable<IPayloadAction<IScheduleElement[]>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_SCHEDULE_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/itineraries/schedule`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success(LocalizeService.translate('ITINERARY_BUSINESS_STORE.SCHEDULE_UPDATE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('ITINERARY_BUSINESS_STORE.SCHEDULE_UPDATE.ERROR'));
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data)),
    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};

const itineraryDeleteEffect = (action$: Observable<IAction>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_DELETE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        EntityApiService.deleteEntity(`/itineraries/${trip.id}`)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success(LocalizeService.translate('ITINERARY_BUSINESS_STORE.DELETE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('ITINERARY_BUSINESS_STORE.DELETE.ERROR'));
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    map((data) => tripStore(data)),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};
// -
// -------------------- Reducers

export const ItineraryBusinessStore = {
  selectors: {},
  actions: {
    itineraryCreate,
    itineraryUpdate,
    itineraryScheduleUpdate,
    itineraryDelete,
  },
  effects: {
    itineraryCreateEffect,
    itineraryUpdateEffect,
    itineraryScheduleUpdateEffect,
    itineraryDeleteEffect,
  },
  reducers: {},
};
