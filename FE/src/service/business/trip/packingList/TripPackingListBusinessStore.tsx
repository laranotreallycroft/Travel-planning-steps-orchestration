import axios from "axios";
import {
  Observable,
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from "rxjs";
import {
  IPackingList,
  IPackingListCreatePayload,
  IPackingListUpdatePayload,
} from "../../../../model/trip/packingList/PackingList";
import { IIdPayload, IPayloadAction } from "../../common/types";
import { getCurrentTrip } from "../TripBusinessStore";
import notificationService from "../../../util/notificationService";

// -
// -------------------- Selectors
const getCurrentPackingList = (store: any): IPackingList =>
  store.currentPackingList;

// -
// -------------------- Actions
const actions = {
  TRIP_PACKING_LIST_CREATE: "TRIP_PACKING_LIST_CREATE",
  TRIP_PACKING_LIST_FETCH: "TRIP_PACKING_LIST_FETCH",
  TRIP_PACKING_LIST_UPDATE: "TRIP_PACKING_LIST_UPDATE",
  // TRIP_PACKING_LIST_DELETE: "TRIP_PACKING_LIST_DELETE",
  TRIP_PACKING_LIST_STORE: "TRIP_PACKING_LIST_STORE",
  TRIP_PACKING_LIST_CLEAR: "TRIP_PACKING_LIST_CLEAR",
};

export const tripPackingListCreate = (
  payload: IPackingListCreatePayload
): IPayloadAction<IPackingListCreatePayload> => {
  return { type: actions.TRIP_PACKING_LIST_CREATE, payload: payload };
};

export const tripPackingListFetch = (
  payload: IIdPayload
): IPayloadAction<IIdPayload> => {
  return { type: actions.TRIP_PACKING_LIST_FETCH, payload: payload };
};

export const tripPackingListUpdate = (
  payload: IPackingListUpdatePayload
): IPayloadAction<IPackingListUpdatePayload> => {
  return { type: actions.TRIP_PACKING_LIST_UPDATE, payload: payload };
};

export const tripPackingListStore = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.TRIP_PACKING_LIST_STORE, payload: payload };
};

// -
// -------------------- Side-effects

const tripPackingListCreateEffect = (
  action$: Observable<IPayloadAction<IPackingListCreatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_PACKING_LIST_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentTrip = getCurrentTrip(state);
      return axios
        .post(`/trips/${currentTrip.id}/packinglist`, action.payload)
        .then((response) => {
          if (response.status === 201) {
            notificationService.success(
              "New trip packing list successfully created!"
            );
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error(
            "Unable to create trip packing list",
            error.response.data
          );
        });
    }),
    filter((data) => data !== undefined),
    map((data) => tripPackingListStore(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

const tripPackingListFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_PACKING_LIST_FETCH;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentTrip = getCurrentTrip(state);
      return axios
        .get(`/trips/${currentTrip.id}/packinglist`)
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
    map((data) => tripPackingListStore(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

const tripPackingListUpdateffect = (
  action$: Observable<IPayloadAction<IPackingListUpdatePayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_PACKING_LIST_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentTrip = getCurrentTrip(state);
      return axios
        .put(`/trips/${currentTrip.id}/packinglist`, action.payload)
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
    map((data) => tripPackingListStore(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

// -
// -------------------- Reducers

const currentPackingList = (
  state: any = null,
  action: IPayloadAction<IPackingList>
) => {
  if (action.type === actions.TRIP_PACKING_LIST_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.TRIP_PACKING_LIST_CLEAR) {
    return null;
  }
  return state;
};

export const TripPackingListBusinessStore = {
  selectors: { getCurrentPackingList },
  actions: {
    tripPackingListCreate,
    tripPackingListFetch,
    tripPackingListUpdate,
    tripPackingListStore,
  },
  effects: {
    tripPackingListCreateEffect,
    tripPackingListFetchEffect,
    tripPackingListUpdateffect,
  },
  reducers: { currentPackingList },
};
