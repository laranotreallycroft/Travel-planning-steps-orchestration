import axios from "axios";
import { Observable, filter, map, mergeMap, withLatestFrom } from "rxjs";
import { ITrip } from "../../../model/trip/Trip";
import { IUserCredentials } from "../../../model/user/User";
import notificationService from "../../util/notificationService";
import { IAction } from "../../util/trackAction";
import { IPayloadAction } from "../common/types";

// -
// -------------------- Selectors
export const getCurrentUser = (store: any): IUserCredentials =>
  store.currentUser;
const getUserTrips = (store: any): ITrip[] => store.userTrips;

// -
// -------------------- Actions
const actions = {
  USER_TRIPS_FETCH: "USER_TRIPS_FETCH",
  USER_TRIPS_STORE: "USER_TRIPS_STORE",
  USER_TRIPS_CLEAR: "USER_TRIPS_CLEAR",
};

export const userTripsFetch = (): IAction => {
  return { type: actions.USER_TRIPS_FETCH };
};

export const userTripsStore = (payload: ITrip[]): IPayloadAction<ITrip[]> => {
  return { type: actions.USER_TRIPS_STORE, payload: payload };
};

const userTripsClear = (): IAction => {
  return { type: actions.USER_TRIPS_CLEAR };
};

// -
// -------------------- Side-effects

const userTripsFetchEffect = (
  action$: Observable<IAction>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => action.type === actions.USER_TRIPS_FETCH),

    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentUser = getCurrentUser(state);

      return axios
        .get(`/users/${currentUser.id}/trips`)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error(
            "Unable to fetch user trips",
            error.response.data
          );
        });
    }),

    filter((data) => data !== undefined),
    map((data) => userTripsStore(data))
  );
};

// -
// -------------------- Reducers

const userTrips = (state: any = null, action: IPayloadAction<ITrip[]>) => {
  if (action.type === actions.USER_TRIPS_STORE) {
    return [...action.payload];
  } else if (action.type === actions.USER_TRIPS_CLEAR) {
    return null;
  }
  return state;
};

export const UserBusinessStore = {
  selectors: { getCurrentUser, getUserTrips },
  actions: { userTripsFetch, userTripsStore, userTripsClear },
  effects: { userTripsFetchEffect },
  reducers: { userTrips },
};
