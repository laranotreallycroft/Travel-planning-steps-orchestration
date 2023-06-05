import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import { IPackingList } from "../../../../model/trip/packingList/PackingList";
import notificationService from "../../../util/notificationService";
import trackAction from "../../../util/trackAction";
import { IPayloadAction } from "../../common/types";
import { getTrip, tripStore } from "../TripBusinessStore";

// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  PACKING_LIST_CREATE: "PACKING_LIST_CREATE",
  PACKING_LIST_UPDATE: "PACKING_LIST_UPDATE",
  PACKING_LIST_CHECKED_UPDATE: "PACKING_LIST_CHECKED_UPDATE",
};

export const packingListCreate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_CREATE, payload: payload };
};

export const packingListUpdate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_UPDATE, payload: payload };
};

export const packingListCheckedUpdate = (
  payload: IPackingList
): IPayloadAction<IPackingList> => {
  return { type: actions.PACKING_LIST_CHECKED_UPDATE, payload: payload };
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
    map((data) => tripStore(data))
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
    map((data) => tripStore(data))
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
    map((data) => tripStore(data))
  );
};

// -
// -------------------- Reducers

export const PackingListBusinessStore = {
  selectors: {},
  actions: {
    packingListCreate,
    packingListUpdate,
    packingListCheckedUpdate,
  },
  effects: {
    packingListCreateEffect,
    packingListUpdateffect,
    packingListCheckedUpdateffect,
  },
  reducers: {},
};
