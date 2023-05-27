import { Action } from "redux";

export interface IPayloadAction<T> extends Action<string> {
  payload: T;
}

export interface IIdPayload {
  id: number;
}
