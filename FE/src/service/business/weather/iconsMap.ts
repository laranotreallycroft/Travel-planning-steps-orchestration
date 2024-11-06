import weatherIcons from "asset/img/weatherIcons";

interface IconsMap {
  [key: string]: string;
}
const iconsMap: IconsMap = {
  "01d": weatherIcons.sunny,
  "02d": weatherIcons.cloudy,
  "03d": weatherIcons.cloudy,
  "04d": weatherIcons.cloudy,
  "09d": weatherIcons.showers,
  "10d": weatherIcons.rain,
  "11d": weatherIcons.thunderstorms,
  "13d": weatherIcons.windySnow,
  "50d": weatherIcons.fog,
  "01n": weatherIcons.sunny,
  "02n": weatherIcons.cloudy,
  "03n": weatherIcons.cloudy,
  "04n": weatherIcons.cloudy,
  "09n": weatherIcons.showers,
  "10n": weatherIcons.rain,
  "11n": weatherIcons.thunderstorms,
  "13n": weatherIcons.windySnow,
  "50n": weatherIcons.fog,
};

export const getIcon = (name: string): string => {
  if (iconsMap[name]) {
    return iconsMap[name];
  }
  return weatherIcons.sunny;
};
