import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import { IShortestRoute } from "../../../model/trip/sightseeing/Sightseeing";
import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../common/types";
import { loginActions } from "../login/LoginBusinessStore";
import { getTrip } from "../trip/TripBusinessStore";

// -
// -------------------- Selectors
const getShortestRoute = (store: any): IShortestRoute => store.shortestRoute;

// -
// -------------------- Actions
const actions = {
  SHORTEST_ROUTE_OPENROUTESERVICE_FETCH:
    "SHORTEST_ROUTE_OPENROUTESERVICE_FETCH",
  SHORTEST_ROUTE_CREATE: "SHORTEST_ROUTE_CREATE",
  SHORTEST_ROUTE_FETCH: "SHORTEST_ROUTE_FETCH",
  SHORTEST_ROUTE_UPDATE: "SHORTEST_ROUTE_UPDATE",
  SHORTEST_ROUTE_STORE: "SHORTEST_ROUTE_STORE",
  SHORTEST_ROUTE_CLEAR: "SHORTEST_ROUTE_CLEAR",
};

export const shortestRouteOpenrouteserviceFetch = (
  payload: IShortestRoute
): IPayloadAction<IShortestRoute> => {
  return { type: actions.SHORTEST_ROUTE_CREATE, payload: payload };
};

export const shortestRouteCreate = (
  payload: IShortestRoute
): IPayloadAction<IShortestRoute> => {
  return { type: actions.SHORTEST_ROUTE_CREATE, payload: payload };
};

export const shortestRouteFetch = (): IAction => {
  return { type: actions.SHORTEST_ROUTE_FETCH };
};

export const shortestRouteUpdate = (
  payload: IShortestRoute
): IPayloadAction<IShortestRoute> => {
  return { type: actions.SHORTEST_ROUTE_UPDATE, payload: payload };
};

export const shortestRouteStore = (
  payload: IShortestRoute
): IPayloadAction<IShortestRoute> => {
  return { type: actions.SHORTEST_ROUTE_STORE, payload: payload };
};

export const shortestRouteClear = (): IAction => {
  return { type: actions.SHORTEST_ROUTE_CLEAR };
};

// -
// -------------------- Side-effects

const shortestRouteCreateEffect = (
  action$: Observable<IPayloadAction<IShortestRoute>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SHORTEST_ROUTE_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .post(`/sightseeing/${trip.id}`, action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success(
                "New trip packing list successfully created"
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
    map((data) => shortestRouteStore(data))
  );
};

const shortestRouteFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SHORTEST_ROUTE_FETCH;
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
    map((data) => shortestRouteStore(data))
  );
};

const shortestRouteUpdateffect = (
  action$: Observable<IPayloadAction<IShortestRoute>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.SHORTEST_ROUTE_UPDATE;
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
    map((data) => shortestRouteStore(data))
  );
};

// -
// -------------------- Reducers

const shortestRoute = (
  state: any = null,
  action: IPayloadAction<IShortestRoute>
) => {
  if (action.type === actions.SHORTEST_ROUTE_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (
    action.type === actions.SHORTEST_ROUTE_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

export const SightseeingBusinessStore = {
  selectors: { getShortestRoute },
  actions: {
    shortestRouteCreate,
    shortestRouteFetch,
    shortestRouteUpdate,
    shortestRouteStore,
    shortestRouteClear,
  },
  effects: {
    shortestRouteCreateEffect,
    shortestRouteFetchEffect,
    shortestRouteUpdateffect,
  },
  reducers: { shortestRoute },
};
