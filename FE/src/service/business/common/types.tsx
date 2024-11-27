import { IAction } from 'service/util/trackAction';

export interface IPayloadAction<T> extends IAction {
  payload: T;
}

export interface IIdPayload {
  id: number;
}
