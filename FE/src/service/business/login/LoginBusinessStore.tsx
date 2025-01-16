import { IUser } from 'model/user/User';
import { Observable, filter, from, ignoreElements, map, mergeMap, of, tap } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import StoreService from 'service/business/StoreService';
import EntityApiService from 'service/business/utils';
import AuthTokenManager from 'service/util/AuthTokenManager';
import LocalizeService from 'service/util/localize/LocalizeService';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

// -
// -------------------- Selectors
const getCurrentUser = (store: any): IUser => store.currentUser;

const isUserLoggedIn = (store: any): boolean => store.currentUser != null;

// -
// -------------------- Actions
export const loginActions = {
  LOGIN: 'LOGIN',
  GOOGLE_LOGIN: 'GOOGLE_LOGIN',
  LOGOUT: 'LOGOUT',
  CURRENT_USER_STORE: 'CURRENT_USER_STORE',
};

export interface IGoogleLoginPayload {
  credential: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  keepSignedin?: boolean;
}

export const login = (payload: ILoginPayload): IPayloadAction<ILoginPayload> => {
  return { type: loginActions.LOGIN, payload: payload };
};

const googleLogin = (payload: IGoogleLoginPayload): IPayloadAction<IGoogleLoginPayload> => {
  return { type: loginActions.GOOGLE_LOGIN, payload: payload };
};

const logout = (): IAction => {
  return { type: loginActions.LOGOUT };
};

export const currentUserStore = (user: IUser): IPayloadAction<IUser> => {
  return { type: loginActions.CURRENT_USER_STORE, payload: user };
};

// -
// -------------------- Side-effects

const loginEffect = (action$: Observable<IPayloadAction<ILoginPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.LOGIN;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.postEntity('/login', action.payload)
          .then((response) => {
            if (response.status === 200) {
              if (action.payload.keepSignedin) {
                AuthTokenManager.saveToken(response.data.token);
              } else {
                AuthTokenManager.saveToken(response.data.token, true);
              }

              notificationService.success(LocalizeService.translate('LOGIN.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('LOGIN.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    map((data) => currentUserStore(data.user))
  );
};

const googleLoginEffect = (action$: Observable<IPayloadAction<ILoginPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.GOOGLE_LOGIN;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.postEntity('/login/google', action.payload)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              if (action.payload.keepSignedin) {
                AuthTokenManager.saveToken(response.data.token);
              } else {
                AuthTokenManager.saveToken(response.data.token, true);
              }

              notificationService.success(LocalizeService.translate('LOGIN.SUCCESS'));
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('LOGIN.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    map((data) => currentUserStore(data.user))
  );
};

const logoutEffect = (action$: Observable<IAction>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.LOGOUT;
    }),

    // persist token
    mergeMap((action) => {
      return of(null).pipe(
        tap(() => {
          AuthTokenManager.deleteToken();
          StoreService.getPersistor().purge();
          notificationService.success(LocalizeService.translate('LOGOUT.SUCCESS'));
        }),

        trackAction(action)
      );
    }),

    // no actions after this so this prevents errors in redux-observable epic
    ignoreElements()
  );
};
// -
// -------------------- Reducers

const currentUser = (state: any = null, action: IPayloadAction<IUser>) => {
  if (action.type === loginActions.CURRENT_USER_STORE) {
    return { ...action.payload };
  } else if (action.type === loginActions.LOGOUT) {
    return null;
  }
  return state;
};

export const LoginBusinessStore = {
  selectors: { getCurrentUser, isUserLoggedIn },
  actions: {
    login,
    googleLogin,
    logout,
  },
  effects: { loginEffect, googleLoginEffect, logoutEffect },
  reducers: { currentUser },
};
