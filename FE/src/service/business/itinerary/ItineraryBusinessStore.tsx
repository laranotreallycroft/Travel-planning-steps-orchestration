import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";

import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../common/types";
import { loginActions } from "../login/LoginBusinessStore";
import { getTrip } from "../trip/TripBusinessStore";
import { IGeosearchPayload } from "../../../components/common/map/MapElement";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";

export interface IItineraryRouteCreatePayload {
  locations: IGeosearchPayload[];
  routeOptions: {
    optimize: boolean;
    carTravel: boolean;
  };
}
// -
// -------------------- Selectors
const getItineraryRoute = (store: any): IItinerary => store.itineraryRoute;

// -
// -------------------- Actions
const actions = {
  SIGHTSEEING_ROUTE_CREATE: "SIGHTSEEING_ROUTE_CREATE",
  SIGHTSEEING_ROUTE_FETCH: "SIGHTSEEING_ROUTE_FETCH",
  SIGHTSEEING_ROUTE_UPDATE: "SIGHTSEEING_ROUTE_UPDATE",
  SIGHTSEEING_ROUTE_STORE: "SIGHTSEEING_ROUTE_STORE",
  SIGHTSEEING_ROUTE_CLEAR: "SIGHTSEEING_ROUTE_CLEAR",
};

export const itineraryRouteCreate = (
  payload: IItineraryRouteCreatePayload
): IPayloadAction<IItineraryRouteCreatePayload> => {
  return { type: actions.SIGHTSEEING_ROUTE_CREATE, payload: payload };
};

export const itineraryRouteFetch = (): IAction => {
  return { type: actions.SIGHTSEEING_ROUTE_FETCH };
};

export const itineraryRouteUpdate = (
  payload: IItinerary
): IPayloadAction<IItinerary> => {
  return { type: actions.SIGHTSEEING_ROUTE_UPDATE, payload: payload };
};

export const itineraryRouteStore = (
  payload: IItinerary
): IPayloadAction<IItinerary> => {
  return { type: actions.SIGHTSEEING_ROUTE_STORE, payload: payload };
};

export const itineraryRouteClear = (): IAction => {
  return { type: actions.SIGHTSEEING_ROUTE_CLEAR };
};

// -
// -------------------- Side-effects

const itineraryRouteCreateEffect = (
  action$: Observable<IPayloadAction<IItineraryRouteCreatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SIGHTSEEING_ROUTE_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .post(`/itinerary/${trip.id}`, action.payload)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              notificationService.success(
                "New itinerary route successfully created"
              );
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to create trip packing list",
              error.response.data
            );
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => itineraryRouteStore(data))
  );
};

const itineraryRouteFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SIGHTSEEING_ROUTE_FETCH;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .get(`/trips/${trip.id}/packinglist`)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else if (response.status === 204) return undefined;
          })
          .catch((error) => {
            notificationService.error(
              "Unable to fetch trip data",
              error.response.data
            );
          })
      ).pipe(trackAction(action));
    }),
    map((data) => itineraryRouteStore(data))
  );
};

const itineraryRouteUpdateffect = (
  action$: Observable<IPayloadAction<IItinerary>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SIGHTSEEING_ROUTE_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .put(`/trips/${trip.id}/packinglist`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to update trip",
              error.response.data
            );
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => itineraryRouteStore(data))
  );
};

// -
// -------------------- Reducers

const itineraryRoute = (
  state: any = null,
  action: IPayloadAction<IItinerary>
) => {
  if (action.type === actions.SIGHTSEEING_ROUTE_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (
    action.type === actions.SIGHTSEEING_ROUTE_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

export const ItineraryBusinessStore = {
  selectors: { getItineraryRoute },
  actions: {
    itineraryRouteCreate,
    itineraryRouteFetch,
    itineraryRouteUpdate,
    itineraryRouteStore,
    itineraryRouteClear,
  },
  effects: {
    itineraryRouteFetchEffect,
    itineraryRouteCreateEffect,
    itineraryRouteUpdateffect,
  },
  reducers: { itineraryRoute },
};
