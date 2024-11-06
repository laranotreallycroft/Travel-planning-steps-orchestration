import axios from "axios";
import { Observable, filter, from, map, mergeMap } from "rxjs";
import { IUserCredentials } from "model/user/User";
import notificationService from "service/util/notificationService";
import trackAction, { IAction } from "service/util/trackAction";
import { IIdPayload, IPayloadAction } from "service/business/common/types";

// -
// -------------------- Selectors
const isUserLoggedIn = (store: any): boolean => store.user != null;

// -
// -------------------- Actions
export const loginActions = {
  LOGIN: "LOGIN",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  LOGOUT: "LOGOUT",
  CURRENT_USER_STORE: "CURRENT_USER_STORE",
};

export interface IGoogleLoginPayload {
  credential: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export const login = (
  payload: ILoginPayload
): IPayloadAction<ILoginPayload> => {
  return { type: loginActions.LOGIN, payload: payload };
};

const googleLogin = (
  payload: IGoogleLoginPayload
): IPayloadAction<IGoogleLoginPayload> => {
  return { type: loginActions.GOOGLE_LOGIN, payload: payload };
};

const logout = (): IAction => {
  return { type: loginActions.LOGOUT };
};

export const currentUserStore = (
  payload: IIdPayload
): IPayloadAction<IIdPayload> => {
  return { type: loginActions.CURRENT_USER_STORE, payload: payload };
};

// -
// -------------------- Side-effects

const loginEffect = (
  action$: Observable<IPayloadAction<ILoginPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.LOGIN;
    }),
    mergeMap((action) => {
      return from(
        axios
          .post("/login", action.payload)
          .then((response) => {
            if (response.status === 200) {
              notificationService.success("Login Successful");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error("Unable to log in", error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
  );
};

const googleLoginEffect = (
  action$: Observable<IPayloadAction<ILoginPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === loginActions.GOOGLE_LOGIN;
    }),
    mergeMap((action) => {
      return from(
        axios
          .post("/login/google", action.payload)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              notificationService.success("Login Successful");
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error("Unable to log in", error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
  );
};

// -
// -------------------- Reducers

const user = (state: any = null, action: IPayloadAction<IUserCredentials>) => {
  if (action.type === loginActions.CURRENT_USER_STORE) {
    return { ...action.payload };
  } else if (action.type === loginActions.LOGOUT) {
    return null;
  }
  return state;
};

export const LoginBusinessStore = {
  selectors: { isUserLoggedIn },
  actions: {
    login,
    googleLogin,
    logout,
  },
  effects: { loginEffect, googleLoginEffect },
  reducers: { user },
};
