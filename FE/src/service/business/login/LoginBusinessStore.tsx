import axios from "axios";
import { IUserCredentials } from "../../../model/user/User";
import { IIdPayload, IPayloadAction } from "../common/types";
import { Action } from "redux";
import { Observable, catchError, filter, map, mergeMap } from "rxjs";
import notificationService from "../../util/notificationService";

// -
// -------------------- Selectors
const isUserLoggedIn = (store: any): boolean => store.currentUser != null;

// -
// -------------------- Actions
const actions = {
  LOGIN: "LOGIN",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  LOGOUT: "LOGOUT",
  CURRENT_USER_STORE: "CURRENT_USER_STORE",
  CURRENT_USER_CLEAR: "CURRENT_USER_CLEAR",
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
  return { type: actions.LOGIN, payload: payload };
};

const googleLogin = (
  payload: IGoogleLoginPayload
): IPayloadAction<IGoogleLoginPayload> => {
  return { type: actions.GOOGLE_LOGIN, payload: payload };
};

const logout = (): Action => {
  return { type: actions.LOGOUT };
};

export const storeCurrentUser = (
  payload: IIdPayload
): IPayloadAction<IIdPayload> => {
  return { type: actions.CURRENT_USER_STORE, payload: payload };
};

export const clearCurrentUser = (): Action => {
  return { type: actions.CURRENT_USER_CLEAR };
};
// -
// -------------------- Side-effects

const loginEffect = (
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
            notificationService.success("Login Successful");
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error("Unable to log in", error.response.data);
        });
    }),
    filter((data) => data !== undefined),
    map((data) => storeCurrentUser(data)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

const googleLoginEffect = (
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
          if (response.status === 200 || response.status === 201) {
            notificationService.success("Login Successful");
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error("Unable to log in", error.response.data);
        });
    }),
    filter((data) => data !== undefined),
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
  action: IPayloadAction<IUserCredentials>
) => {
  if (action.type === actions.CURRENT_USER_STORE) {
    return { ...action.payload };
  } else if (
    action.type === actions.LOGOUT ||
    action.type === actions.CURRENT_USER_CLEAR
  ) {
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
    storeCurrentUser,
  },
  effects: { loginEffect, googleLoginEffect },
  reducers: { currentUser },
};
