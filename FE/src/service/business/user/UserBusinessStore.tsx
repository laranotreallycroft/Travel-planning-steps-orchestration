import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import { ITrip } from "../../../model/trip/Trip";
import { IUserCredentials } from "../../../model/user/User";
import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IPayloadAction } from "../common/types";
import { loginActions } from "../login/LoginBusinessStore";

// -
// -------------------- Selectors
export const getUser = (store: any): IUserCredentials => store.user;
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
      const user = getUser(state);

      return from(
        axios
          .get(`/users/${user.id}/trips`)
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
          })
      ).pipe(trackAction(action));
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
  } else if (
    action.type === actions.USER_TRIPS_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

export const UserBusinessStore = {
  selectors: { getUser, getUserTrips },
  actions: { userTripsFetch, userTripsStore, userTripsClear },
  effects: { userTripsFetchEffect },
  reducers: { userTrips },
};
