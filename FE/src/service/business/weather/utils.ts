import { IWeather } from 'model/trip/weather/Weather';
import { getIcon } from 'service/business/weather/iconsMap';

export const mapIcon = (weather: IWeather): any => {
  weather.current.icon = getIcon(weather.current.icon);
  weather.forecast.forEach((day) => (day.icon = getIcon(day.icon)));
  return weather;
};
