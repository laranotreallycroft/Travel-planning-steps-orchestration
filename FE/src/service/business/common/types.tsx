import { IAction } from "../../util/trackAction";

export interface IPayloadAction<T> extends IAction {
  payload: T;
}

export interface IIdPayload {
  id: number;
}
export interface IUUIdPayload {
  id: string;
}
