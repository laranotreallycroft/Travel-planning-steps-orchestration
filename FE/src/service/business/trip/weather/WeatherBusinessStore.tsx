import axios from "axios";
import { Observable, filter, from, map, mergeMap, withLatestFrom } from "rxjs";
import {
  IWeather,
  IWeatherPayload,
} from "../../../../model/trip/weather/Weather";
import notificationService from "../../../util/notificationService";
import trackAction, { IAction } from "../../../util/trackAction";
import { IPayloadAction } from "../../common/types";
import { mapData } from "./utils";

// -
// -------------------- Selectors
const getCurrentWeather = (store: any): IWeather => store.currentWeather;

// -
// -------------------- Actions
const actions = {
  TRIP_WEATHER_FETCH: "TRIP_WEATHER_FETCH",
  TRIP_WEATHER_STORE: "TRIP_WEATHER_STORE",
  TRIP_WEATHER_CLEAR: "TRIP_WEATHER_CLEAR",
};

export const tripWeatherFetch = (
  payload: IWeatherPayload
): IPayloadAction<IWeatherPayload> => {
  return { type: actions.TRIP_WEATHER_FETCH, payload: payload };
};

export const tripWeatherStore = (
  payload: IWeather
): IPayloadAction<IWeather> => {
  return { type: actions.TRIP_WEATHER_STORE, payload: payload };
};

export const tripWeatherClear = (): IAction => {
  return { type: actions.TRIP_WEATHER_CLEAR };
};

// -
// -------------------- Side-effects

const tripWeatherFetchEffect = (
  action$: Observable<IPayloadAction<IWeatherPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.TRIP_WEATHER_FETCH;
    }),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const baseUrl = "https://api.openweathermap.org/data/3.0/";
      const url = action.payload.isHistory
        ? `onecall/timemachine?lat=${action.payload.lat}&lon=${action.payload.lon}&exclude=minutely&units=metric&appid=e767a44febd8dff85969c3726d040132`
        : `onecall?lat=${action.payload.lat}&lon=${action.payload.lon}&exclude=minutely&units=metric&appid=e767a44febd8dff85969c3726d040132`;
      //if longterm vs shortterm
      return from(
        axios({
          method: "get",
          url: url,
          baseURL: baseUrl,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else return undefined;
          })
          .catch((error) => {
            notificationService.error(
              "Unable to fetch weather data",
              error.response.data.message
            );
          })
      ).pipe(trackAction(action));
    }),
    mergeMap((data) => {
      return axios({
        method: "get",
        url: `reverse?lat=${data.lat}&lon=${data.lon}&limit=5&appid=e767a44febd8dff85969c3726d040132`,
        baseURL: "http://api.openweathermap.org/geo/1.0/",
      })
        .then((response) => {
          const payload = mapData(data.daily, data.current, "en");

          return { ...payload, name: response.data[0].name };
        })
        .catch((error) => {
          notificationService.error(
            "Unable to fetch weather data",
            error.response.data.message
          );
        });
    }),

    filter((data) => data !== undefined),

    map((data) => {
      return tripWeatherStore(data!);
    })
  );
};

// -
// -------------------- Reducers

const currentWeather = (
  state: any = null,
  action: IPayloadAction<IWeather>
) => {
  if (action.type === actions.TRIP_WEATHER_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.TRIP_WEATHER_CLEAR) {
    return null;
  }
  return state;
};

export const WeatherBusinessStore = {
  selectors: { getCurrentWeather },
  actions: {
    tripWeatherFetch,
    tripWeatherStore,
    tripWeatherClear,
  },
  effects: {
    tripWeatherFetchEffect,
  },
  reducers: { currentWeather },
};
