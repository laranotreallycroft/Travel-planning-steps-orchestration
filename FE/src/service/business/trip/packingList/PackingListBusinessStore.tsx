import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import { IPackingList } from "../../../../model/trip/packingList/PackingList";
import notificationService from "../../../util/notificationService";
import trackAction, { IAction } from "../../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../../common/types";
import { getCurrentTrip } from "../TripBusinessStore";

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
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.TRIP_PACKING_LIST_CREATE, payload: payload };
};

export const tripPackingListFetch = (): IAction => {
  return { type: actions.TRIP_PACKING_LIST_FETCH };
};

export const tripPackingListUpdate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.TRIP_PACKING_LIST_UPDATE, payload: payload };
};

export const tripPackingListStore = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.TRIP_PACKING_LIST_STORE, payload: payload };
};

export const tripPackingListClear = (): IAction => {
  return { type: actions.TRIP_PACKING_LIST_CLEAR };
};

// -
// -------------------- Side-effects

const tripPackingListCreateEffect = (
  action$: Observable<IPayloadAction<IPackingList>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_PACKING_LIST_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentTrip = getCurrentTrip(state);
      return from(
        axios
          .post(`/trips/${currentTrip.id}/packinglist`, action.payload)
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
    map((data) => tripPackingListStore(data))
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
      return from(
        axios
          .get(`/trips/${currentTrip.id}/packinglist`)
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
    map((data) => tripPackingListStore(data))
  );
};

const tripPackingListUpdateffect = (
  action$: Observable<IPayloadAction<IPackingList>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_PACKING_LIST_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const currentTrip = getCurrentTrip(state);
      return from(
        axios
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
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripPackingListStore(data))
  );
};

// -
// -------------------- Reducers

const currentPackingList = (
  state: any = null,
  action: IPayloadAction<IPackingList>
) => {
  if (action.type === actions.TRIP_PACKING_LIST_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (action.type === actions.TRIP_PACKING_LIST_CLEAR) {
    return null;
  }
  return state;
};

export const PackingListBusinessStore = {
  selectors: { getCurrentPackingList },
  actions: {
    tripPackingListCreate,
    tripPackingListFetch,
    tripPackingListUpdate,
    tripPackingListStore,
    tripPackingListClear,
  },
  effects: {
    tripPackingListCreateEffect,
    tripPackingListFetchEffect,
    tripPackingListUpdateffect,
  },
  reducers: { currentPackingList },
};
