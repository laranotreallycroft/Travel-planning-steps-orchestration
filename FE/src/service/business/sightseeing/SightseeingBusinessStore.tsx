import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";

import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../common/types";
import { loginActions } from "../login/LoginBusinessStore";
import { getTrip } from "../trip/TripBusinessStore";
import { IGeosearchPayload } from "../../../components/common/map/MapElement";
import { ISightseeing } from "../../../model/trip/sightseeing/Sightseeing";

export interface ISightseeingRouteCreatePayload {
  locations: IGeosearchPayload[];
  routeOptions: {
    optimize: boolean;
    carTravel: boolean;
  };
}
// -
// -------------------- Selectors
const getSightseeingRoute = (store: any): ISightseeing =>
  store.sightseeingRoute;

// -
// -------------------- Actions
const actions = {
  SIGHTSEEING_ROUTE_CREATE: "SIGHTSEEING_ROUTE_CREATE",
  SIGHTSEEING_ROUTE_FETCH: "SIGHTSEEING_ROUTE_FETCH",
  SIGHTSEEING_ROUTE_UPDATE: "SIGHTSEEING_ROUTE_UPDATE",
  SIGHTSEEING_ROUTE_STORE: "SIGHTSEEING_ROUTE_STORE",
  SIGHTSEEING_ROUTE_CLEAR: "SIGHTSEEING_ROUTE_CLEAR",
};

export const sightseeingRouteCreate = (
  payload: ISightseeingRouteCreatePayload
): IPayloadAction<ISightseeingRouteCreatePayload> => {
  return { type: actions.SIGHTSEEING_ROUTE_CREATE, payload: payload };
};

export const sightseeingRouteFetch = (): IAction => {
  return { type: actions.SIGHTSEEING_ROUTE_FETCH };
};

export const sightseeingRouteUpdate = (
  payload: ISightseeing
): IPayloadAction<ISightseeing> => {
  return { type: actions.SIGHTSEEING_ROUTE_UPDATE, payload: payload };
};

export const sightseeingRouteStore = (
  payload: ISightseeing
): IPayloadAction<ISightseeing> => {
  return { type: actions.SIGHTSEEING_ROUTE_STORE, payload: payload };
};

export const sightseeingRouteClear = (): IAction => {
  return { type: actions.SIGHTSEEING_ROUTE_CLEAR };
};

// -
// -------------------- Side-effects

const sightseeingRouteCreateEffect = (
  action$: Observable<IPayloadAction<ISightseeingRouteCreatePayload>>,
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
          .post(`/sightseeing/${trip.id}`, action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success(
                "New sightseeing route successfully created"
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
    map((data) => sightseeingRouteStore(data))
  );
};

const sightseeingRouteFetchEffect = (
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
    map((data) => sightseeingRouteStore(data))
  );
};

const sightseeingRouteUpdateffect = (
  action$: Observable<IPayloadAction<ISightseeing>>,
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
    map((data) => sightseeingRouteStore(data))
  );
};

// -
// -------------------- Reducers

const sightseeingRoute = (
  state: any = null,
  action: IPayloadAction<ISightseeing>
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

export const SightseeingBusinessStore = {
  selectors: { getSightseeingRoute },
  actions: {
    sightseeingRouteCreate,
    sightseeingRouteFetch,
    sightseeingRouteUpdate,
    sightseeingRouteStore,
    sightseeingRouteClear,
  },
  effects: {
    sightseeingRouteFetchEffect,
    sightseeingRouteCreateEffect,
    sightseeingRouteUpdateffect,
  },
  reducers: { sightseeingRoute },
};

/* const payload: IShortestRouteOpenrouteservicePayload = {
      jobs: values.map((value, index) => {
        return { id: index, location: [value.x, value.y], skills: [1] };
      }),
      vehicles: [
        {
          id: 1,
          profile: "driving-car",
          start: [values[0].x, values[0].y],
          end: [values[0].x, values[0].y],
          capacity: [4],
          skills: [1, 14],
        },
      ],
    };*/
