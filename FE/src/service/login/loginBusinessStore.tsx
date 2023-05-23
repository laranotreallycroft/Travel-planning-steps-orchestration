import axios, { AxiosResponse } from "axios";
import { IAppUser } from "../../model/appUser/appUser";

export interface IGoogleLoginPayload {
  credential: string;
}
export interface IRegularLoginPayload {
  email: string;
  password: string;
}

export const googleLogin = (googleLoginPayload: IGoogleLoginPayload) =>
  axios
    .post("/login/google", googleLoginPayload)
    .then((value: AxiosResponse<IAppUser>) => console.log(value.data));

export const regularLogin = (regularLoginPayload: IRegularLoginPayload) =>
  axios
    .post("/login", regularLoginPayload)
    .then((value: AxiosResponse<IAppUser>) => console.log(value.data));
