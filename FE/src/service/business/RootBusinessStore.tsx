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
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";

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

const persistConfig = {
  key: "appStore",
  storage,
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store: Store<{}, any> = createStore(
  persistedRootReducer,
  compose(applyMiddleware(...storeMiddleware))
);
const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export const getStore = () => store;
export const getPersistor = () => persistor;
