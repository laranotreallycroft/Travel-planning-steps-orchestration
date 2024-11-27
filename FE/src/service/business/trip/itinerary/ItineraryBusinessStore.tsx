import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import axios from 'axios';
import { IGeosearchPayloadWithId } from 'model/geometry/Coordinates';
import { IItinerary } from 'model/trip/itinerary/Itinerary';
import { Observable, catchError, filter, from, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { getTrip, tripStore } from 'service/business/trip/TripBusinessStore';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

export interface IItineraryElementPayload extends IGeosearchPayloadWithId {
  duration: number;
}

export interface IItineraryForm {
  locations: IItineraryElementPayload[];
  settings: IItinerarySettings;
}
export interface IItineraryPayload extends IItineraryForm {
  tripId: number;
}

export interface IItinerarySettings {
  routeOptions: {
    optimize: boolean;
    vehicleProfile: string;
  };
}
// -
// -------------------- Selectors
const getItinerary = (store: any): IItinerary => store.itinerary;

// -
// -------------------- Actions
const actions = {
  ITINERARIES_CREATE: 'ITINERARIES_CREATE',
  ITINERARIES_UPDATE: 'ITINERARIES_UPDATE',
  ITINERARY_SCHEDULE_UPDATE: 'ITINERARY_SCHEDULE_UPDATE',
  ITINERARIES_DELETE: 'ITINERARIES_DELETE',
  ITINERARY_STORE: 'ITINERARY_STORE',
  ITINERARY_CLEAR: 'ITINERARY_CLEAR',
};

export const itinerariesCreate = (payload: IItineraryPayload): IPayloadAction<IItineraryPayload> => {
  return { type: actions.ITINERARIES_CREATE, payload: payload };
};

export const itinerariesUpdate = (payload: IItineraryPayload): IPayloadAction<IItineraryPayload> => {
  return { type: actions.ITINERARIES_UPDATE, payload: payload };
};

export const itineraryScheduleUpdate = (payload: AppointmentModel[]): IPayloadAction<AppointmentModel[]> => {
  return { type: actions.ITINERARY_SCHEDULE_UPDATE, payload: payload };
};
export const itinerariesDelete = (): IAction => {
  return { type: actions.ITINERARIES_DELETE };
};
export const itineraryStore = (payload: IItinerary): IPayloadAction<IItinerary> => {
  return { type: actions.ITINERARY_STORE, payload: payload };
};

export const itineraryClear = (): IAction => {
  return { type: actions.ITINERARY_CLEAR };
};

// -
// -------------------- Side-effects

const itinerariesCreateEffect = (action$: Observable<IPayloadAction<IItineraryPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARIES_CREATE;
    }),
    mergeMap((action) => {
      return from(
        axios
          .post(`/itineraries`, action.payload)
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

const itinerariesUpdateEffect = (action$: Observable<IPayloadAction<IItineraryPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARIES_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        axios
          .put(`/itineraries`, action.payload)
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
        axios
          .put(`/itineraries/schedule`, action.payload)
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

const itinerariesDeleteEffect = (action$: Observable<IAction>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARIES_DELETE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .delete(`/itineraries/${trip.id}`)
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
    switchMap((data) => of(tripStore(data), itineraryClear())),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};
// -
// -------------------- Reducers

const itinerary = (state: any = null, action: IPayloadAction<IItinerary>) => {
  if (action.type === actions.ITINERARY_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (action.type === actions.ITINERARY_CLEAR) {
    return null;
  }
  return state;
};

export const ItineraryBusinessStore = {
  selectors: { getItinerary },
  actions: {
    itinerariesCreate,
    itinerariesUpdate,
    itineraryScheduleUpdate,
    itinerariesDelete,
    itineraryStore,
    itineraryClear,
  },
  effects: {
    itinerariesCreateEffect,
    itinerariesUpdateEffect,
    itineraryScheduleUpdateEffect,
    itinerariesDeleteEffect,
  },
  reducers: { itinerary },
};
