import axios from 'axios';
import { IUserCredentials } from 'model/user/User';
import { Observable, filter, from, ignoreElements, map, mergeMap, of, tap } from 'rxjs';
import { IIdPayload, IPayloadAction } from 'service/business/common/types';
import StoreService from 'service/business/StoreService';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

// -
// -------------------- Selectors
const getCurrentUser = (store: any): IUserCredentials => store.currentUser;

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

export const currentUserStore = (payload: IIdPayload): IPayloadAction<IIdPayload> => {
  return { type: loginActions.CURRENT_USER_STORE, payload: payload };
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
        axios
          .post('/login', action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success('Login Successful');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to log in', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
  );
};

const googleLoginEffect = (action$: Observable<IPayloadAction<ILoginPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.GOOGLE_LOGIN;
    }),
    mergeMap((action) => {
      return from(
        axios
          .post('/login/google', action.payload)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              notificationService.success('Login Successful');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to log in', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
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
          StoreService.getPersistor().purge();
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

const currentUser = (state: any = null, action: IPayloadAction<IUserCredentials>) => {
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
