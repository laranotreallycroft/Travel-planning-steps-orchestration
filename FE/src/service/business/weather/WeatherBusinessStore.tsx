import axios from 'axios';
import { IWeather, IWeatherPayload } from 'model/trip/weather/Weather';
import { Observable, filter, forkJoin, from, map, mergeMap, toArray } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import EntityApiService from 'service/business/utils';
import { mapData, mapIcon } from 'service/business/weather/utils';
import AppConfigService from 'service/common/AppConfigService';
import { CookieManager } from 'service/util/CookieManager';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

const cookieLocaleName = AppConfigService.getValue('cookies.locale.name');
const cookieLocaleValue = CookieManager.getCookie(cookieLocaleName);
const weatherApiId = AppConfigService.getValue('weather.apiId');

// -
// -------------------- Selectors
const getCurrentWeather = (store: any): IWeather => store.currentWeather;
const getPastWeather = (store: any): IWeather => store.pastWeather;

// -
// -------------------- Actions
const actions = {
  CURRENT_WEATHER_FETCH: 'CURRENT_WEATHER_FETCH',
  CURRENT_WEATHER_STORE: 'CURRENT_WEATHER_STORE',
  CURRENT_WEATHER_CLEAR: 'CURRENT_WEATHER_CLEAR',

  PAST_WEATHER_FETCH: 'PAST_WEATHER_FETCH',
  PAST_WEATHER_STORE: 'PAST_WEATHER_STORE',
  PAST_WEATHER_CLEAR: 'PAST_WEATHER_CLEAR',
};

export const currentWeatherFetch = (payload: IWeatherPayload): IPayloadAction<IWeatherPayload> => {
  return { type: actions.CURRENT_WEATHER_FETCH, payload: payload };
};

export const currentWeatherStore = (payload: IWeather): IPayloadAction<IWeather> => {
  return { type: actions.CURRENT_WEATHER_STORE, payload: payload };
};

export const currentWeatherClear = (): IAction => {
  return { type: actions.CURRENT_WEATHER_CLEAR };
};

export const pastWeatherFetch = (payload: IWeatherPayload): IPayloadAction<IWeatherPayload> => {
  return { type: actions.PAST_WEATHER_FETCH, payload: payload };
};

export const pastWeatherStore = (payload: IWeather): IPayloadAction<IWeather> => {
  return { type: actions.PAST_WEATHER_STORE, payload: payload };
};

export const pastWeatherClear = (): IAction => {
  return { type: actions.PAST_WEATHER_CLEAR };
};

// -
// -------------------- Side-effects

const currentWeatherFetchEffect = (action$: Observable<IPayloadAction<IWeatherPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.CURRENT_WEATHER_FETCH;
    }),
    mergeMap((action) => {
      return from(
        EntityApiService.getEntity('/weather/current', { ...action.payload, lang: cookieLocaleValue })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            notificationService.error('Unable to fetch weather data', error.response.data.message);
          })
      ).pipe(trackAction(action));
    }),
    map((data) => {
      const mappedIcon = mapIcon(data);
      return currentWeatherStore(mappedIcon);
    })
  );
};

const pastWeatherFetchEffect = (action$: Observable<IPayloadAction<IWeatherPayload>>, state$: Observable<any>) => {
  return action$.pipe(
    filter((action) => {
      return action.type === actions.PAST_WEATHER_FETCH;
    }),
    mergeMap((action) => {
      const baseUrl = 'https://api.openweathermap.org/data/3.0/';
      const cookieLocaleValue = CookieManager.getCookie(cookieLocaleName);

      const requests: any[] = [];
      requests.push(
        axios({
          method: 'get',
          url: `reverse?lat=${action.payload.lat}&lon=${action.payload.lon}&lang=${cookieLocaleValue}&limit=5&appid=${weatherApiId}`,
          baseURL: 'http://api.openweathermap.org/geo/1.0/',
        })
      );

      for (let i = action.payload.timestampFrom!; i <= action.payload.timestampTo! && i <= action.payload.timestampFrom! + 86400 * 10; i += 86400) {
        requests.push(
          axios({
            method: 'get',
            url: `onecall/timemachine?lat=${action.payload.lat}&lon=${action.payload.lon}&dt=${i}&exclude=minutely,hourly,alert&units=metric&appid=${weatherApiId}`,
            baseURL: baseUrl,
          })
        );
      }
      return forkJoin(requests).pipe(
        mergeMap((responses) => {
          const data = responses.map((response) => (response.status === 200 ? response.data : undefined));
          return data;
        }),
        toArray()
      );
    }),

    map((data) => {
      const namePayload = data[0][0];
      const dataPayload = data.slice(1).map((data) => data.data[0]);
      const payload = mapData(dataPayload, dataPayload[0], cookieLocaleValue);
      return pastWeatherStore({ ...payload, name: namePayload.name });
    })
  );
};

// -
// -------------------- Reducers

const currentWeather = (state: any = null, action: IPayloadAction<IWeather>) => {
  if (action.type === actions.CURRENT_WEATHER_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.CURRENT_WEATHER_CLEAR) {
    return null;
  }
  return state;
};

const pastWeather = (state: any = null, action: IPayloadAction<IWeather>) => {
  if (action.type === actions.PAST_WEATHER_STORE) {
    return { ...action.payload };
  } else if (action.type === actions.PAST_WEATHER_CLEAR) {
    return null;
  }
  return state;
};

export const WeatherBusinessStore = {
  selectors: { getCurrentWeather, getPastWeather },
  actions: {
    currentWeatherFetch,
    currentWeatherStore,
    currentWeatherClear,

    pastWeatherFetch,
    pastWeatherStore,
    pastWeatherClear,
  },
  effects: {
    currentWeatherFetchEffect,
    pastWeatherFetchEffect,
  },
  reducers: { currentWeather, pastWeather },
};
