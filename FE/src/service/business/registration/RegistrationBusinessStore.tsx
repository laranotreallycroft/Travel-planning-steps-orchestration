import axios, { AxiosResponse } from "axios";
import { IAppUserInfo } from "../../../model/appUser/appUser";

export interface IRegistrationPayload {
  email: string;
  password: string;
}

export const registration = (registrationPayload: IRegistrationPayload) =>
  axios
    .post("/registration", registrationPayload)
    .then((value: AxiosResponse<IAppUserInfo>) => console.log(value.data));
