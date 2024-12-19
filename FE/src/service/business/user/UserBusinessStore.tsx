import { Observable, filter, from, map, mergeMap } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { currentUserStore } from 'service/business/login/LoginBusinessStore';
import EntityApiService from 'service/business/utils';
import LocalizeService from 'service/util/localize/LocalizeService';
import notificationService from 'service/util/notificationService';
import trackAction from 'service/util/trackAction';

// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  CREATE_USER: 'CREATE_USER',
};

export interface IUserCreatePayload {
  email: string;
  password: string;
  confirmPassword: string;
}

const createUser = (payload: IUserCreatePayload): IPayloadAction<IUserCreatePayload> => {
  return { type: actions.CREATE_USER, payload: payload };
};

// -
// -------------------- Side-effects

const userCreateEffect = (action$: Observable<IPayloadAction<IUserCreatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.CREATE_USER;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.postEntity('/users', action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success(LocalizeService.translate('USER_BUSINESS_STORE.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('USER_BUSINESS_STORE.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
  );
};

// -
// -------------------- Reducers

export const UserBusinessStore = {
  selectors: {},
  actions: {
    createUser,
  },
  effects: { userCreateEffect },
  reducers: {},
};
