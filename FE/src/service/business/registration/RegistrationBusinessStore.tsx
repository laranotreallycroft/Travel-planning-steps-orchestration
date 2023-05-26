import axios from "axios";
import { IPayloadAction } from "../common/types";
import { Observable, catchError, filter, map, mergeMap } from "rxjs";
import { storeCurrentUser } from "../login/LoginBusinessStore";
import notificationService from "../../util/notificationService";

// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  REGISTRATION: "REGISTRATION",
};

export interface IRegistrationPayload {
  email: string;
  password: string;
}

const doRegistration = (
  payload: IRegistrationPayload
): IPayloadAction<IRegistrationPayload> => {
  return { type: actions.REGISTRATION, payload: payload };
};

// -
// -------------------- Side-effects

const doRegistrationEffect = (
  action$: Observable<IPayloadAction<IRegistrationPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.REGISTRATION;
    }),
    mergeMap((action) => {
      return axios
        .post("/registration", action.payload)
        .then((response) => {
          if (response.status === 201) {
            notificationService.success("Registration Successfull");
            return response.data;
          }
        })
        .catch((error) => {
          notificationService.error(
            "Unable to register user",
            error.response.data
          );
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

export const RegistrationBusinessStore = {
  selectors: {},
  actions: {
    doRegistration,
  },
  effects: { doRegistrationEffect },
  reducers: {},
};
