import {
  Store,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { LoginBusinessStore } from "./login/LoginBusinessStore";
import { RegistrationBusinessStore } from "./registration/RegistrationBusinessStore";

const storeMiddleware = [];
const epicMiddleware = createEpicMiddleware();
storeMiddleware.push(epicMiddleware);

const rootEpic = combineEpics(
  ...Object.keys(LoginBusinessStore.effects).map(
    (key) => (LoginBusinessStore.effects as any)[key]
  ),
  ...Object.keys(RegistrationBusinessStore.effects).map(
    (key) => (RegistrationBusinessStore.effects as any)[key]
  )
);

const rootReducer = combineReducers({
  ...LoginBusinessStore.reducers,
  ...RegistrationBusinessStore.reducers,
});

const store: Store<{}, any> = createStore(
  rootReducer,
  compose(applyMiddleware(...storeMiddleware))
);
epicMiddleware.run(rootEpic);

export const getStore = () => store;
