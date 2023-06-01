import axios from "axios";
import {
  Observable,
  filter,
  from,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { ITrip, ITripCreatePayload } from "../../../model/trip/Trip";
import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../common/types";
import { getUser, userTripsFetch } from "../user/UserBusinessStore";
import { loginActions } from "../login/LoginBusinessStore";

// -
// -------------------- Selectors
export const getTrip = (store: any): ITrip => store.trip;

// -
// -------------------- Actions
const actions = {
  TRIP_CREATE: "TRIP_CREATE",
  TRIP_FETCH: "TRIP_FETCH",
  TRIP_UPDATE: "TRIP_UPDATE",
  // TRIP_DELETE: "TRIP_DELETE",
  TRIP_STORE: "TRIP_STORE",
  TRIP_CLEAR: "TRIP_CLEAR",
};

export const tripCreate = (
  payload: ITripCreatePayload
): IPayloadAction<ITripCreatePayload> => {
  return { type: actions.TRIP_CREATE, payload: payload };
};

export const tripFetch = (payload: IIdPayload): IPayloadAction<IIdPayload> => {
  return { type: actions.TRIP_FETCH, payload: payload };
};

export const tripUpdate = (payload: ITrip): IPayloadAction<ITrip> => {
  return { type: actions.TRIP_UPDATE, payload: payload };
};

export const tripStore = (payload: ITrip): IPayloadAction<ITrip> => {
  return { type: actions.TRIP_STORE, payload: payload };
};

export const tripClear = (): IAction => {
  return { type: actions.TRIP_CLEAR };
};

// -
// -------------------- Side-effects

const tripCreateEffect = (
  action$: Observable<IPayloadAction<ITripCreatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const user = getUser(state);
      return from(
        axios
          .post("/trips", { ...action.payload, userId: user.id })
          .then((response) => {
            if (response.status === 201) {
              notificationService.success("New trip successfully created");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to create trip",
              error.response.data
            );
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data))
  );
};

const tripFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_FETCH;
    }),
    mergeMap((action) => {
      return from(
        axios
          .get("/trips/" + action.payload.id)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(
              "Unable to fetch trip data",
              error.response.data
            );
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data))
  );
};

const tripUpdateffect = (
  action$: Observable<IPayloadAction<ITrip>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        axios
          .put("/trips/" + action.payload.id, action.payload)
          .then((response) => {
            if (response.status === 204) {
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
    map((data) => tripStore(data)),
    tap(() => userTripsFetch())
  );
};

// -
// -------------------- Reducers

const trip = (state: any = null, action: IPayloadAction<ITrip>) => {
  if (action.type === actions.TRIP_STORE) {
    return { ...action.payload };
  } else if (
    action.type === actions.TRIP_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
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
    tripStore,
    tripClear,
  },
  effects: { tripCreateEffect, tripFetchEffect, tripUpdateffect },
  reducers: { trip },
};
