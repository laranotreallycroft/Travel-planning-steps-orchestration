export interface IWeatherPayload {
  lat: number;
  lon: number;
  timestampFrom?: number;
  timestampTo?: number;
}
export interface IWeather {
  name: string;
}
