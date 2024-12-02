import { Store, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { LoginBusinessStore } from 'service/business/login/LoginBusinessStore';
import { ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { PackingListBusinessStore } from 'service/business/trip/packingList/PackingListBusinessStore';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { TripListBusinessStore } from 'service/business/trip/TripListBusinessStore';
import { UserBusinessStore } from 'service/business/user/UserBusinessStore';
import UserSettingsBusinessStore from 'service/business/usersettings/userSettingsBusinessStore';
import { WeatherBusinessStore } from 'service/business/weather/WeatherBusinessStore';

const storeMiddleware = [];
const epicMiddleware = createEpicMiddleware();
storeMiddleware.push(epicMiddleware);

const rootEpic = combineEpics(
  ...Object.keys(LoginBusinessStore.effects).map((key) => (LoginBusinessStore.effects as any)[key]),
  ...Object.keys(TripBusinessStore.effects).map((key) => (TripBusinessStore.effects as any)[key]),
  ...Object.keys(UserBusinessStore.effects).map((key) => (UserBusinessStore.effects as any)[key]),
  ...Object.keys(TripListBusinessStore.effects).map((key) => (TripListBusinessStore.effects as any)[key]),
  ...Object.keys(PackingListBusinessStore.effects).map((key) => (PackingListBusinessStore.effects as any)[key]),
  ...Object.keys(WeatherBusinessStore.effects).map((key) => (WeatherBusinessStore.effects as any)[key]),
  ...Object.keys(ItineraryBusinessStore.effects).map((key) => (ItineraryBusinessStore.effects as any)[key]),
  ...Object.keys(UserSettingsBusinessStore.effects).map((key) => (UserSettingsBusinessStore.effects as any)[key])
);

const rootReducer = combineReducers({
  ...LoginBusinessStore.reducers,
  ...TripBusinessStore.reducers,
  ...UserBusinessStore.reducers,
  ...TripListBusinessStore.reducers,
  ...PackingListBusinessStore.reducers,
  ...WeatherBusinessStore.reducers,
  ...ItineraryBusinessStore.reducers,
  ...UserSettingsBusinessStore.reducers,
});

const persistConfig = {
  key: 'appStore',
  storage,
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store: Store<{}, any> = createStore(persistedRootReducer, compose(applyMiddleware(...storeMiddleware)));
const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export const getStore = () => store;
export const getPersistor = () => persistor;
