import axios from 'axios';
import { Observable, filter, from, map, mergeMap } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import { currentUserStore } from 'service/business/login/LoginBusinessStore';
import notificationService from 'service/util/notificationService';
import trackAction from 'service/util/trackAction';

// -
// -------------------- Selectors

// -
// -------------------- Actions
const actions = {
  CREATE_USER: 'CREATE_USER',
};

export interface IUserCreatePayload {
  email: string;
  password: string;
}

const createUser = (payload: IUserCreatePayload): IPayloadAction<IUserCreatePayload> => {
  return { type: actions.CREATE_USER, payload: payload };
};

// -
// -------------------- Side-effects

const userCreateEffect = (action$: Observable<IPayloadAction<IUserCreatePayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.CREATE_USER;
    }),
    mergeMap((action) => {
      return from(
        axios
          .post('/users', action.payload)
          .then((response) => {
            if (response.status === 201) {
              notificationService.success('User successfully created');
              return response.data;
            }
          })
          .catch((error) => {
            notificationService.error('Unable to create user', error.response.data);
          })
      ).pipe(trackAction(action));
    }),
    filter((data) => data !== undefined),
    map((data) => currentUserStore(data))
  );
};

// -
// -------------------- Reducers

export const UserBusinessStore = {
  selectors: {},
  actions: {
    createUser,
  },
  effects: { userCreateEffect },
  reducers: {},
};
