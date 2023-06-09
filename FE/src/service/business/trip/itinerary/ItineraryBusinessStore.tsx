import axios from "axios";
import {
  Observable,
  catchError,
  filter,
  from,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from "rxjs";
import { IGeosearchPayloadWithId } from "../../../../components/common/map/MapElement";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import notificationService from "../../../util/notificationService";
import trackAction, { IAction } from "../../../util/trackAction";
import { IPayloadAction } from "../../common/types";
import { loginActions } from "../../login/LoginBusinessStore";
import { getTrip, tripStore } from "../TripBusinessStore";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export interface IItineraryCreatePayload {
  date: string;
  locations: IGeosearchPayloadWithId[];
  settings: IItinerarySettings;
}

export interface IItineraryUpdatePayload {
  id: number;
  locations: IGeosearchPayloadWithId[];
  settings: IItinerarySettings;
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
  ITINERARY_CREATE: "ITINERARY_CREATE",
  ITINERARY_ROUTE_UPDATE: "ITINERARY_ROUTE_UPDATE",
  ITINERARY_SCHEDULE_UPDATE: "ITINERARY_SCHEDULE_UPDATE",
  ITINERARY_STORE: "ITINERARY_STORE",
  ITINERARY_CLEAR: "ITINERARY_CLEAR",
};

export const itineraryCreate = (
  payload: IItineraryCreatePayload
): IPayloadAction<IItineraryCreatePayload> => {
  return { type: actions.ITINERARY_CREATE, payload: payload };
};

export const itineraryRouteUpdate = (
  payload: IItineraryUpdatePayload
): IPayloadAction<IItineraryUpdatePayload> => {
  return { type: actions.ITINERARY_ROUTE_UPDATE, payload: payload };
};

export const itineraryScheduleUpdate = (
  payload: AppointmentModel[]
): IPayloadAction<AppointmentModel[]> => {
  return { type: actions.ITINERARY_SCHEDULE_UPDATE, payload: payload };
};

export const itineraryStore = (
  payload: IItinerary
): IPayloadAction<IItinerary> => {
  return { type: actions.ITINERARY_STORE, payload: payload };
};

export const itineraryClear = (): IAction => {
  return { type: actions.ITINERARY_CLEAR };
};

// -
// -------------------- Side-effects

const itineraryCreateEffect = (
  action$: Observable<IPayloadAction<IItineraryCreatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .post(`/itinerary`, { ...action.payload, tripId: trip.id })
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              notificationService.success("New itinerary successfully created");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to create itinerary",
              error.response.data
            );
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) =>
      of(
        itineraryStore(data.itineraries?.[data.itineraries?.length - 1]),
        tripStore(data)
      )
    ),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};
const itineraryRouteUpdateEffect = (
  action$: Observable<IPayloadAction<IItineraryUpdatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_ROUTE_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const itinerary = getItinerary(state);
      return from(
        axios
          .put(`/itinerary/${itinerary.id}/route`, action.payload)
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              notificationService.success("Itinerary successfully updated");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to update itinerary",
              error.response.data
            );
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) =>
      of(
        itineraryStore(data.itineraries?.[data.itineraries?.length - 1]),
        tripStore(data)
      )
    ),

    catchError((error: any, o: Observable<any>) => {
      return o;
    })
  );
};
const itineraryScheduleUpdateEffect = (
  action$: Observable<IPayloadAction<AppointmentModel[]>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.ITINERARY_SCHEDULE_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const itinerary = getItinerary(state);
      return from(
        axios
          .put(`/itinerary/${itinerary.id}/schedule`, action.payload)
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              notificationService.success("Itinerary successfully updated");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to update itinerary",
              error.response.data
            );
            throw error;
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) =>
      of(
        itineraryStore(data.itineraries?.[data.itineraries?.length - 1]),
        tripStore(data)
      )
    ),

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
  } else if (
    action.type === actions.ITINERARY_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

export const ItineraryBusinessStore = {
  selectors: { getItinerary },
  actions: {
    itineraryCreate,
    itineraryRouteUpdate,
    itineraryScheduleUpdate,
    itineraryStore,
    itineraryClear,
  },
  effects: {
    itineraryCreateEffect,
    itineraryRouteUpdateEffect,
    itineraryScheduleUpdateEffect,
  },
  reducers: { itinerary },
};
