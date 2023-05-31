import { connect } from "react-redux";
import { IWeather, IWeatherPayload } from "../../../model/trip/weather/Weather";
import { WeatherBusinessStore } from "../../../service/business/trip/weather/WeatherBusinessStore";
import { useEffect } from "react";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip } from "../../../model/trip/Trip";
import ReactWeather from "react-open-weather";
import React from "react";
export interface IWeatherContainerOwnProps {}

export interface IWeatherContainerStateProps {
  weather: IWeather;
  trip: ITrip;
}
export interface IWeatherContainerDispatchProps {
  weatherFetch: (weatherPayload: IWeatherPayload) => void;
  weatherClear: () => void;
}
type IWeatherContainerProps = IWeatherContainerOwnProps &
  IWeatherContainerStateProps &
  IWeatherContainerDispatchProps;

const WeatherContainer: React.FC<IWeatherContainerProps> = (
  props: IWeatherContainerProps
) => {
  useEffect(() => {
    props.weatherFetch({
      isHistory: false,
      lat: props.trip.location.y,
      lon: props.trip.location.x,
    });
    return () => {
      props.weatherClear();
    };
  }, [props.trip]);

  return (
    <React.Fragment>
      <ReactWeather
        data={props.weather}
        lang="en"
        locationLabel={props.weather?.name}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
      <ReactWeather
        data={props.weather}
        lang="en"
        locationLabel={props.weather?.name}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IWeatherContainerStateProps => ({
  weather: WeatherBusinessStore.selectors.getweather(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IWeatherContainerDispatchProps => ({
  weatherFetch: (weatherPayload: IWeatherPayload) =>
    dispatch(WeatherBusinessStore.actions.weatherFetch(weatherPayload)),
  weatherClear: () => dispatch(WeatherBusinessStore.actions.weatherClear()),
});

export default connect<
  IWeatherContainerStateProps,
  IWeatherContainerDispatchProps,
  IWeatherContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(WeatherContainer);
