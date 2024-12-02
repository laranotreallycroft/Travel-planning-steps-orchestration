import { ITrip } from 'model/trip/Trip';
import { Observable, filter, from, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { getTrip, tripStore } from 'service/business/trip/TripBusinessStore';
import { tripListStore } from 'service/business/trip/TripListBusinessStore';
import EntityApiService from 'service/business/utils';
import notificationService from 'service/util/notificationService';
import trackAction from 'service/util/trackAction';

export interface IPackingListCreatePayload {
  tripId: string;
  label: string;
  items: string[];
}
export interface IPackingListUpdatePayload {
  packingListId: number;
  label?: string;
  items?: string[];
}

export interface IPackingListUpdateCombinedPayload {
  update: IPackingListUpdatePayload[];
  delete: number[];
}

export interface IPackingListCopyPayload {
  tripId: string;
  packingListIds: number[];
}
// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  PACKING_LIST_CREATE: 'PACKING_LIST_CREATE',
  PACKING_LIST_COPY: 'PACKING_LIST_COPY',
  PACKING_LIST_UPDATE: 'PACKING_LIST_UPDATE',
  PACKING_LIST_CHECKED: 'PACKING_LIST_CHECKED',
};

export const packingListCreate = (payload: IPackingListCreatePayload): IPayloadAction<IPackingListCreatePayload> => {
  return { type: actions.PACKING_LIST_CREATE, payload: payload };
};
export const packingListCopy = (payload: IPackingListCopyPayload): IPayloadAction<IPackingListCopyPayload> => {
  return { type: actions.PACKING_LIST_COPY, payload: payload };
};

export const packingListUpdate = (payload: IPackingListUpdateCombinedPayload): IPayloadAction<IPackingListUpdateCombinedPayload> => {
  return { type: actions.PACKING_LIST_UPDATE, payload: payload };
};

export const packingListChecked = (payload: IPackingListUpdatePayload): IPayloadAction<IPackingListUpdatePayload> => {
  return { type: actions.PACKING_LIST_CHECKED, payload: payload };
};

// -
// -------------------- Side-effects

const packingListCreateEffect = (action$: Observable<IPayloadAction<IPackingListCreatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_CREATE;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        EntityApiService.postEntity(`/packinglists`, action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success('New packing list successfully created');

              return {
                tripList: response.data,
                trip: response.data.find((value: ITrip) => value.id === trip.id),
              };
            }
          })
          .catch((error) => {
            notificationService.error('Unable to create packing list', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) => of(tripListStore(data?.tripList), tripStore(data?.trip)))
  );
};

const packingListCopyEffect = (action$: Observable<IPayloadAction<IPackingListCopyPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_COPY;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const trip = getTrip(state);
      return from(
        EntityApiService.postEntity(`/packinglists/copy`, action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success('New packing lists successfully created');
              return {
                tripList: response.data,
                trip: response.data.find((value: ITrip) => value.id === trip.id),
              };
            }
          })
          .catch((error) => {
            notificationService.error('Unable to create packing lists', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    switchMap((data) => of(tripListStore(data?.tripList), tripStore(data?.trip)))
  );
};

const packingListUpdateffect = (action$: Observable<IPayloadAction<IPackingListUpdateCombinedPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_UPDATE;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/packinglists`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update trip', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => tripStore(data))
  );
};

const packingListCheckedffect = (action$: Observable<IPayloadAction<IPackingListUpdatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PACKING_LIST_CHECKED;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.putEntity(`/packinglists/checked`, action.payload)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to update trip', error.response.data);
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
    packingListCopy,
    packingListUpdate,
    packingListChecked,
  },
  effects: {
    packingListCreateEffect,
    packingListCopyEffect,
    packingListUpdateffect,
    packingListCheckedffect,
  },
  reducers: {},
};
