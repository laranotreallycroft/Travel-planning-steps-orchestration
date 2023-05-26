import axios from "axios";
import { IAppUserInfo } from "../../../model/appUser/appUser";
import { IPayloadAction } from "../common/types";
import { Action } from "redux";
import { Observable, catchError, filter, map, mergeMap } from "rxjs";
import notificationService from "../../util/notificationService";

// -
// -------------------- Selectors
const getCurrentUser = (store: any): IAppUserInfo => store.currentUser;
const isUserLoggedIn = (store: any): boolean => store.currentUser != null;

// -
// -------------------- Actions
const actions = {
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

export const doLogin = (
  payload: ILoginPayload
): IPayloadAction<ILoginPayload> => {
  return { type: actions.LOGIN, payload: payload };
};

const doGoogleLogin = (
  payload: IGoogleLoginPayload
): IPayloadAction<IGoogleLoginPayload> => {
  return { type: actions.GOOGLE_LOGIN, payload: payload };
};

const doLogout = (): Action => {
  return { type: actions.LOGOUT };
};

export const storeCurrentUser = (
  payload: IAppUserInfo
): IPayloadAction<IAppUserInfo> => {
  return { type: actions.CURRENT_USER_STORE, payload: payload };
};
// -
// -------------------- Side-effects

const doLoginEffect = (
  action$: Observable<IPayloadAction<ILoginPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.LOGIN;
    }),
    mergeMap((action) => {
      return axios
        .post("/login", action.payload)
        .then((response) => {
          if (response.status === 200) {
            notificationService.success("Login Successfull");
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error("Unable to log in", error.response.data);
        });
    }),
    map((data) => storeCurrentUser(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

const doGoogleLoginEffect = (
  action$: Observable<IPayloadAction<ILoginPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.GOOGLE_LOGIN;
    }),
    mergeMap((action) => {
      return axios
        .post("/login/google", action.payload)
        .then((response) => {
          if (response.status === 200) {
            notificationService.success("Login Successfull");
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error("Unable to log in", error.response.data);
        });
    }),
    map((data) => storeCurrentUser(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

// -
// -------------------- Reducers

const currentUser = (
  state: any = null,
  action: IPayloadAction<IAppUserInfo>
) => {
  if (action.type === actions.CURRENT_USER_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.LOGOUT) {
    notificationService.success("Logout Successfull");
    return null;
  }
  return state;
};

export const LoginBusinessStore = {
  selectors: { getCurrentUser, isUserLoggedIn },
  actions: {
    doLogin,
    doGoogleLogin,
    doLogout,
    storeCurrentUser,
  },
  effects: { doLoginEffect, doGoogleLoginEffect },
  reducers: { currentUser },
};
