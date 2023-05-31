import axios from "axios";
import { Observable, filter, from, map, mergeMap } from "rxjs";
import { IUserCredentials } from "../../../model/user/User";
import notificationService from "../../util/notificationService";
import trackAction, { IAction } from "../../util/trackAction";
import { IIdPayload, IPayloadAction } from "../common/types";

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

const logout = (): IAction => {
  return { type: actions.LOGOUT };
};

export const storeCurrentUser = (
  payload: IIdPayload
): IPayloadAction<IIdPayload> => {
  return { type: actions.CURRENT_USER_STORE, payload: payload };
};

export const clearCurrentUser = (): IAction => {
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
    map((data) => storeCurrentUser(data))
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
    map((data) => storeCurrentUser(data))
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
