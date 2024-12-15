import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { ILocation } from 'model/geometry/Coordinates';

import { Observable, catchError, filter, from, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { getTrip, tripStore } from 'service/business/trip/TripBusinessStore';
import EntityApiService from 'service/business/utils';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

export interface IItineraryElementPayload {
  id: string;
  location: ILocation;
  duration: number;
}

export interface IItineraryForm {
  stops: IItineraryElementPayload[];
  optimize: boolean;
  transportationMethod: string;
}
export interface IItineraryPayload extends IItineraryForm {
  tripId: string;
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

export const itineraryScheduleUpdate = (payload: AppointmentModel[]): IPayloadAction<AppointmentModel[]> => {
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
              notificationService.success('New itineraries successfully created');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to create itineraries', error.response.data);
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
              notificationService.success('Itineraries successfully updated');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update itineraries', error.response.data);
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
const itineraryScheduleUpdateEffect = (action$: Observable<IPayloadAction<AppointmentModel[]>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_SCHEDULE_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/itineraries/schedule`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success('Itinerary schedules successfully updated');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update itinerary schedules', error.response.data);
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
              notificationService.success('Itineraries successfully deleted');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to delete itinerary', error.response.data);
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) => of(tripStore(data))),

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
