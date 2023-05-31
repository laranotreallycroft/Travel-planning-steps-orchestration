import axios from "axios";
import { Observable, catchError, filter, map, mergeMap } from "rxjs";
import { ITrip, ITripCreatePayload } from "../../../model/trip/Trip";
import notificationService from "../../util/notificationService";
import { IIdPayload, IPayloadAction } from "../common/types";
import { userTripsFetch } from "../user/UserBusinessStore";

// -
// -------------------- Selectors
export const getCurrentTrip = (store: any): ITrip => store.currentTrip;

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
    mergeMap((action) => {
      return axios
        .post("/trips", action.payload)
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
        });
    }),
    map((data) => userTripsFetch()),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
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
      return axios
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
        });
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
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
      return axios
        .put("/trips/" + action.payload.id, action.payload)
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
        });
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

// -
// -------------------- Reducers

const currentTrip = (state: any = null, action: IPayloadAction<ITrip>) => {
  if (action.type === actions.TRIP_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.TRIP_CLEAR) {
    return null;
  }
  return state;
};

export const TripBusinessStore = {
  selectors: { getCurrentTrip },
  actions: {
    tripCreate,
    tripFetch,
    tripUpdate,
    tripStore,
  },
  effects: { tripCreateEffect, tripFetchEffect, tripUpdateffect },
  reducers: { currentTrip },
};
