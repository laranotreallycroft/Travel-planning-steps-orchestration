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
import { TripBusinessStore } from "./trip/TripBusinessStore";
import { UserBusinessStore } from "./user/UserBusinessStore";
import { TripPackingListBusinessStore } from "./trip/packingList/TripPackingListBusinessStore";

const storeMiddleware = [];
const epicMiddleware = createEpicMiddleware();
storeMiddleware.push(epicMiddleware);

const rootEpic = combineEpics(
  ...Object.keys(LoginBusinessStore.effects).map(
    (key) => (LoginBusinessStore.effects as any)[key]
  ),
  ...Object.keys(RegistrationBusinessStore.effects).map(
    (key) => (RegistrationBusinessStore.effects as any)[key]
  ),
  ...Object.keys(TripBusinessStore.effects).map(
    (key) => (TripBusinessStore.effects as any)[key]
  ),
  ...Object.keys(UserBusinessStore.effects).map(
    (key) => (UserBusinessStore.effects as any)[key]
  ),
  ...Object.keys(TripPackingListBusinessStore.effects).map(
    (key) => (TripPackingListBusinessStore.effects as any)[key]
  )
);

const rootReducer = combineReducers({
  ...LoginBusinessStore.reducers,
  ...RegistrationBusinessStore.reducers,
  ...TripBusinessStore.reducers,
  ...UserBusinessStore.reducers,
  ...TripPackingListBusinessStore.reducers,
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
