import dayjs from 'dayjs';
import { getIcon } from 'service/business/weather/iconsMap';
import { v4 as uuidv4 } from 'uuid';

export const formatDate = (dte: number | null, lang: string): string => {
  if (lang && lang !== 'en') {
    dayjs.locale(lang.replace('_', '-'));
  }
  if (dte && dayjs(dte).isValid()) {
    return dayjs.unix(dte).format('ddd D MMMM');
  }
  return '';
};

export const mapCurrent = (day: any, lang: string): any => {
  return {
    date: formatDate(day.dt, lang),
    description: day.weather[0] ? day.weather[0].description : null,
    icon: day.weather[0] && getIcon(day.weather[0].icon),
    temperature: {
      current: day.temp.toFixed(0),
      min: undefined, // openweather doesn't provide min/max on current weather
      max: undefined,
    },
    wind: day.wind_speed.toFixed(0),
    humidity: day.humidity,
  };
};

export const mapForecast = (forecast: any[], lang: string): any[] => {
  const mappedForecast: any[] = [];
  for (let i = 0; i < forecast.length; i += 1) {
    mappedForecast.push({
      date: formatDate(forecast[i].dt, lang),
      description: forecast[i].weather[0] ? forecast[i].weather[0].description : null,
      icon: forecast[i].weather[0] && getIcon(forecast[i].weather[0].icon),
      temperature: {
        min: forecast[i].temp.min?.toFixed(0) ?? undefined,
        max: forecast[i].temp.max ? forecast[i].temp.max.toFixed(0) : forecast[i].temp.toFixed(0),
      },
      wind: forecast[i].wind_speed.toFixed(0),
      humidity: forecast[i].humidity,
      key: uuidv4(),
    });
  }
  return mappedForecast;
};

export const mapData = (forecastData: any, todayData: any, lang: string): any => {
  const mapped: any = {};
  if (forecastData && todayData) {
    mapped.current = mapCurrent(todayData, lang);
    mapped.forecast = mapForecast(forecastData, lang);
  }
  return mapped;
};
