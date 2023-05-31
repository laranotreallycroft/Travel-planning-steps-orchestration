import axios from "axios";
import { Observable, filter, map, mergeMap } from "rxjs";
import notificationService from "../../util/notificationService";
import { IPayloadAction } from "../common/types";
import { storeCurrentUser } from "../login/LoginBusinessStore";

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

const registration = (
  payload: IRegistrationPayload
): IPayloadAction<IRegistrationPayload> => {
  return { type: actions.REGISTRATION, payload: payload };
};

// -
// -------------------- Side-effects

const registrationEffect = (
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
            notificationService.success("Registration Successful");
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
    filter((data) => data !== undefined),
    map((data) => storeCurrentUser(data))
  );
};

// -
// -------------------- Reducers

export const RegistrationBusinessStore = {
  selectors: {},
  actions: {
    registration,
  },
  effects: { registrationEffect },
  reducers: {},
};
