import axios from "axios";
import { IPayloadAction } from "../common/types";
import { Observable, catchError, filter, map, mergeMap } from "rxjs";
import notificationService from "../../util/notificationService";
import { ITrip, ITripCreatePayload } from "../../../model/trip/Trip";

// -
// -------------------- Selectors
const getCurrentTrip = (store: any): ITrip => store.currentTrip;

// -
// -------------------- Actions
const actions = {
  TRIP_CREATE: "TRIP_CREATE",
  // TRIP_UPDATE: "TRIP_UPDATE",
  TRIP_STORE: "TRIP_STORE",
  // TRIP_FETCH: "TRIP_FETCH",
  TRIP_DELETE: "TRIP_DELETE",
  TRIP_CLEAR: "TRIP_CLEAR",
};

export const createTrip = (
  payload: ITripCreatePayload
): IPayloadAction<ITripCreatePayload> => {
  return { type: actions.TRIP_CREATE, payload: payload };
};

export const storeTrip = (payload: ITrip): IPayloadAction<ITrip> => {
  return { type: actions.TRIP_STORE, payload: payload };
};
/*
export const deleteTrip = (payload: ITrip): IPayloadAction<ITrip> => {
  return { type: actions.TRIP_DELETE, payload: payload };
};
*/
// -
// -------------------- Side-effects

const createTripEffect = (
  action$: Observable<IPayloadAction<ITripCreatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_CREATE;
    }),
    mergeMap((action) => {
      return axios
        .post("/trip", action.payload)
        .then((response) => {
          if (response.status === 201) {
            notificationService.success("New trip successfully created!");
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
    map((data) => storeTrip(data)),
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
    createTrip,
    storeTrip,
    //deleteTrip,
  },
  effects: { createTripEffect },
  reducers: { currentTrip },
};
