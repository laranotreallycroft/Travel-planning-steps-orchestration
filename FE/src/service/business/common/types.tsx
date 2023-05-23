import { Action } from "redux";

export interface IPayloadAction<T> extends Action<string> {
  payload: T;
}
