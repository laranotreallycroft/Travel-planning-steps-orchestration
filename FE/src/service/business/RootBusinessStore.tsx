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
import { PackingListBusinessStore } from "./trip/packingList/PackingListBusinessStore";
import { WeatherBusinessStore } from "./weather/WeatherBusinessStore";
import { ItineraryBusinessStore } from "./trip/itinerary/ItineraryBusinessStore";

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
  ...Object.keys(PackingListBusinessStore.effects).map(
    (key) => (PackingListBusinessStore.effects as any)[key]
  ),
  ...Object.keys(WeatherBusinessStore.effects).map(
    (key) => (WeatherBusinessStore.effects as any)[key]
  ),
  ...Object.keys(ItineraryBusinessStore.effects).map(
    (key) => (ItineraryBusinessStore.effects as any)[key]
  )
);

const rootReducer = combineReducers({
  ...LoginBusinessStore.reducers,
  ...RegistrationBusinessStore.reducers,
  ...TripBusinessStore.reducers,
  ...UserBusinessStore.reducers,
  ...PackingListBusinessStore.reducers,
  ...WeatherBusinessStore.reducers,
  ...ItineraryBusinessStore.reducers,
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
