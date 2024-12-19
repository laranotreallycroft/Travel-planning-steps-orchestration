import { IWeather, IWeatherPayload } from 'model/trip/weather/Weather';
import { Observable, filter, from, map, mergeMap } from 'rxjs';
import { IPayloadAction } from 'service/business/common/types';
import EntityApiService from 'service/business/utils';
import { mapIcon } from 'service/business/weather/utils';
import AppConfigService from 'service/common/AppConfigService';
import { CookieManager } from 'service/util/CookieManager';
import LocalizeService from 'service/util/localize/LocalizeService';
import notificationService from 'service/util/notificationService';
import trackAction, { IAction } from 'service/util/trackAction';

const cookieLocaleName = AppConfigService.getValue('cookies.locale.name');
const cookieLocaleValue = CookieManager.getCookie(cookieLocaleName);

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
            notificationService.error(LocalizeService.translate('WEATHER_BUSINESS_STORE.ERROR'));
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
      return from(
        EntityApiService.getEntity('/weather/past', { ...action.payload, lang: cookieLocaleValue })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            notificationService.error(LocalizeService.translate('WEATHER_BUSINESS_STORE.ERROR'));
          })
      ).pipe(trackAction(action));
    }),
    map((data) => {
      const mappedIcon = mapIcon(data);
      return pastWeatherStore(mappedIcon);
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
