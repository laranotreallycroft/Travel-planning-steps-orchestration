import axios, { AxiosResponse } from "axios";
import { IAppUserInfo } from "../../../model/appUser/appUser";
import { IPayloadAction } from "../common/types";
import { Action } from "redux";
import { Observable, catchError, filter, ignoreElements, mergeMap } from "rxjs";

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
  CURRENT_USER_FETCH: "CURRENT_USER_FETCH",
  CURRENT_USER_CLEAR: "CURRENT_USER_CLEAR",
};

export interface IGoogleLoginPayload {
  credential: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

const doLogin = (payload: ILoginPayload): IPayloadAction<ILoginPayload> => {
  return { type: actions.LOGIN, payload: payload };
};

const doGoogleLogin = (
  payload: IGoogleLoginPayload
): IPayloadAction<IGoogleLoginPayload> => {
  return { type: actions.LOGIN, payload: payload };
};

const doLogout = (): Action => {
  return { type: actions.LOGOUT };
};

const fetchCurrentUser = (): Action => {
  return { type: actions.CURRENT_USER_FETCH };
};

const storeCurrentUser = (
  payload: IAppUserInfo
): IPayloadAction<IAppUserInfo> => {
  return { type: actions.CURRENT_USER_STORE, payload: payload };
};

const clearCurrentUser = (): Action => {
  return { type: actions.CURRENT_USER_CLEAR };
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
      // Make an Axios call to perform the login operation
      return axios
        .post("/login", action.payload)
        .then((response) => {
          // Process the successful response if needed
          console.log(response.data);
          // Return any relevant actions
          return /* relevant action */;
        })
        .catch((error) => {
          // Handle the error if needed
          console.log(error);
          // Return any relevant error actions
          return /* relevant error action */;
        });
    }),
    ignoreElements(),
    // reportCaughtMessage((error: any) => console.log(error)),
    catchError((error: any, o: Observable<any>) => {
      console.log(error);
      return o;
    })
  );
};

export const googleLogin = (googleLoginPayload: IGoogleLoginPayload) =>
  axios
    .post("/login/google", googleLoginPayload)
    .then((value: AxiosResponse<IAppUserInfo>) => console.log(value.data));

export const regularLogin = (regularLoginPayload: ILoginPayload) =>
  axios
    .post("/login", regularLoginPayload)
    .then((value: AxiosResponse<IAppUserInfo>) => console.log(value.data));

// -
// -------------------- Reducers

const currentUser = (
  state: any = null,
  action: IPayloadAction<IAppUserInfo>
) => {
  if (action.type === actions.CURRENT_USER_STORE) return action.payload;
  else if (action.type === actions.CURRENT_USER_CLEAR) return null;
  return state;
};

export const LoginBusinessStore = {
  actions: {
    doLogin,
    doGoogleLogin,
    doLogout,
    fetchCurrentUser,
    storeCurrentUser,
    clearCurrentUser,
  },
  selectors: { getCurrentUser, isUserLoggedIn },
  effects: { doLoginEffect },
  reducers: { currentUser },
};
