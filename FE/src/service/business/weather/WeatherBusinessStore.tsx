import axios from "axios";
import {
  Observable,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  toArray,
} from "rxjs";
import { IWeather, IWeatherPayload } from "model/trip/weather/Weather";
import notificationService from "service/util/notificationService";
import trackAction, { IAction } from "service/util/trackAction";
import { IPayloadAction } from "service/business/common/types";
import { mapData } from "service/business/weather/utils";
import { loginActions } from "service/business/login/LoginBusinessStore";

// -
// -------------------- Selectors
const getCurrentWeather = (store: any): IWeather => store.currentWeather;
const getPredictedWeather = (store: any): IWeather => store.predictedWeather;

// -
// -------------------- Actions
const actions = {
  CURRENT_WEATHER_FETCH: "CURRENT_WEATHER_FETCH",
  CURRENT_WEATHER_STORE: "CURRENT_WEATHER_STORE",
  CURRENT_WEATHER_CLEAR: "CURRENT_WEATHER_CLEAR",

  PREDICTED_WEATHER_FETCH: "PREDICTED_WEATHER_FETCH",
  PREDICTED_WEATHER_STORE: "PREDICTED_WEATHER_STORE",
  PREDICTED_WEATHER_CLEAR: "PREDICTED_WEATHER_CLEAR",
};

export const currentWeatherFetch = (
  payload: IWeatherPayload
): IPayloadAction<IWeatherPayload> => {
  return { type: actions.CURRENT_WEATHER_FETCH, payload: payload };
};

export const currentWeatherStore = (
  payload: IWeather
): IPayloadAction<IWeather> => {
  return { type: actions.CURRENT_WEATHER_STORE, payload: payload };
};

export const currentWeatherClear = (): IAction => {
  return { type: actions.CURRENT_WEATHER_CLEAR };
};

export const predictedWeatherFetch = (
  payload: IWeatherPayload
): IPayloadAction<IWeatherPayload> => {
  return { type: actions.PREDICTED_WEATHER_FETCH, payload: payload };
};

export const predictedWeatherStore = (
  payload: IWeather
): IPayloadAction<IWeather> => {
  return { type: actions.PREDICTED_WEATHER_STORE, payload: payload };
};

export const predictedWeatherClear = (): IAction => {
  return { type: actions.PREDICTED_WEATHER_CLEAR };
};

// -
// -------------------- Side-effects

const currentWeatherFetchEffect = (
  action$: Observable<IPayloadAction<IWeatherPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.CURRENT_WEATHER_FETCH;
    }),
    mergeMap((action) => {
      const baseUrl = "https://api.openweathermap.org/data/3.0/";
      const url = `onecall?lat=${action.payload.lat}&lon=${action.payload.lon}&exclude=minutely&units=metric&appid=e767a44febd8dff85969c3726d040132`;

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
      return currentWeatherStore(data!);
    })
  );
};

const predictedWeatherFetchEffect = (
  action$: Observable<IPayloadAction<IWeatherPayload>>,
  state$: Observable<any>
) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PREDICTED_WEATHER_FETCH;
    }),
    mergeMap((action) => {
      const baseUrl = "https://api.openweathermap.org/data/3.0/";

      const requests: any[] = [];
      requests.push(
        axios({
          method: "get",
          url: `reverse?lat=${action.payload.lat}&lon=${action.payload.lon}&limit=5&appid=e767a44febd8dff85969c3726d040132`,
          baseURL: "http://api.openweathermap.org/geo/1.0/",
        })
      );

      for (
        let i = action.payload.timestampFrom!;
        i <= action.payload.timestampTo! &&
        i <= action.payload.timestampFrom! + 86400 * 10;
        i += 86400
      ) {
        requests.push(
          axios({
            method: "get",
            url: `onecall/timemachine?lat=${action.payload.lat}&lon=${action.payload.lon}&dt=${i}&exclude=minutely&units=metric&appid=e767a44febd8dff85969c3726d040132`,
            baseURL: baseUrl,
          })
        );
      }
      return forkJoin(requests).pipe(
        mergeMap((responses) => {
          const data = responses.map((response) =>
            response.status === 200 ? response.data : undefined
          );
          return data;
        }),
        toArray()
      );
    }),

    map((data) => {
      const namePayload = data[0][0];
      const dataPayload = data.slice(1).map((data) => data.data[0]);
      const payload = mapData(dataPayload, dataPayload[0], "en");
      return predictedWeatherStore({ ...payload, name: namePayload.name });
    })
  );
};

// -
// -------------------- Reducers

const currentWeather = (
  state: any = null,
  action: IPayloadAction<IWeather>
) => {
  if (action.type === actions.CURRENT_WEATHER_STORE) {
    return { ...action.payload };
  } else if (
    action.type === actions.CURRENT_WEATHER_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

const predictedWeather = (
  state: any = null,
  action: IPayloadAction<IWeather>
) => {
  if (action.type === actions.PREDICTED_WEATHER_STORE) {
    return { ...action.payload };
  } else if (
    action.type === actions.PREDICTED_WEATHER_CLEAR ||
    action.type === loginActions.LOGOUT
  ) {
    return null;
  }
  return state;
};

export const WeatherBusinessStore = {
  selectors: { getCurrentWeather, getPredictedWeather },
  actions: {
    currentWeatherFetch,
    currentWeatherStore,
    currentWeatherClear,

    predictedWeatherFetch,
    predictedWeatherStore,
    predictedWeatherClear,
  },
  effects: {
    currentWeatherFetchEffect,
    predictedWeatherFetchEffect,
  },
  reducers: { currentWeather, predictedWeather },
};
