import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import { IPackingList } from "../../../../model/trip/packingList/PackingList";
import notificationService from "../../../util/notificationService";
import trackAction, { IAction } from "../../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../../common/types";
import { loginActions } from "../../login/LoginBusinessStore";
import { getTrip } from "../TripBusinessStore";

// -
// -------------------- Selectors
const getPackingList = (store: any): IPackingList => store.packingList;
const getPackingListChecked = (store: any): IPackingList =>
  store.packingListChecked;

// -
// -------------------- Actions
const actions = {
  PACKING_LIST_CREATE: "PACKING_LIST_CREATE",
  PACKING_LIST_FETCH: "PACKING_LIST_FETCH",
  PACKING_LIST_UPDATE: "PACKING_LIST_UPDATE",
  // PACKING_LIST_DELETE: "PACKING_LIST_DELETE",
  PACKING_LIST_STORE: "PACKING_LIST_STORE",
  PACKING_LIST_CLEAR: "PACKING_LIST_CLEAR",
  PACKING_LIST_CHECKED_FETCH: "PACKING_LIST_CHECKED_FETCH",
  PACKING_LIST_CHECKED_UPDATE: "PACKING_LIST_CHECKED_UPDATE",
  // PACKING_LIST_DELETE: "PACKING_LIST_DELETE",
  PACKING_LIST_CHECKED_STORE: "PACKING_LIST_CHECKED_STORE",
  PACKING_LIST_CHECKED_CLEAR: "PACKING_LIST_CHECKED_CLEAR",
};

export const packingListCreate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_CREATE, payload: payload };
};

export const packingListFetch = (): IAction => {
  return { type: actions.PACKING_LIST_FETCH };
};

export const packingListUpdate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_UPDATE, payload: payload };
};

export const packingListStore = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_STORE, payload: payload };
};

export const packingListClear = (): IAction => {
  return { type: actions.PACKING_LIST_CLEAR };
};

export const packingListCheckedFetch = (): IAction => {
  return { type: actions.PACKING_LIST_CHECKED_FETCH };
};

export const packingListCheckedUpdate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_CHECKED_UPDATE, payload: payload };
};

export const packingListCheckedStore = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_CHECKED_STORE, payload: payload };
};

export const packingListCheckedClear = (): IAction => {
  return { type: actions.PACKING_LIST_CHECKED_CLEAR };
};

// -
// -------------------- Side-effects

const packingListCreateEffect = (
  action$: Observable<IPayloadAction<IPackingList>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .post(`/trips/${trip.id}/packinglist`, action.payload)
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
    map((data) => packingListStore(data))
  );
};

const packingListFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_FETCH;
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
    map((data) => packingListStore(data))
  );
};

const packingListUpdateffect = (
  action$: Observable<IPayloadAction<IPackingList>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_UPDATE;
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
    map((data) => packingListStore(data))
  );
};

const packingListCheckedFetchEffect = (
  action$: Observable<IPayloadAction<IIdPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_CHECKED_FETCH;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .get(`/trips/${trip.id}/packinglist/checked`)
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
    map((data) => packingListCheckedStore(data))
  );
};

const packingListCheckedUpdateffect = (
  action$: Observable<IPayloadAction<IPackingList>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_CHECKED_UPDATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        axios
          .put(`/trips/${trip.id}/packinglist/checked`, action.payload)
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
    map((data) => packingListCheckedStore(data))
  );
};

// -
// -------------------- Reducers

const packingList = (
  state: any = null,
  action: IPayloadAction<IPackingList>
) => {
  if (action.type === actions.PACKING_LIST_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (
    action.type === actions.PACKING_LIST_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

const packingListChecked = (
  state: any = null,
  action: IPayloadAction<IPackingList>
) => {
  if (action.type === actions.PACKING_LIST_CHECKED_STORE) {
    if (action.payload) return { ...action.payload };
    else return null;
  } else if (
    action.type === actions.PACKING_LIST_CHECKED_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};
export const PackingListBusinessStore = {
  selectors: { getPackingList, getPackingListChecked },
  actions: {
    packingListCreate,
    packingListFetch,
    packingListUpdate,
    packingListStore,
    packingListClear,
    packingListCheckedFetch,
    packingListCheckedUpdate,
    packingListCheckedStore,
    packingListCheckedClear,
  },
  effects: {
    packingListCreateEffect,
    packingListFetchEffect,
    packingListUpdateffect,
    packingListCheckedFetchEffect,
    packingListCheckedUpdateffect,
  },
  reducers: { packingList, packingListChecked },
};
