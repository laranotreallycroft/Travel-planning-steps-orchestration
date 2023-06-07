import { connect } from "react-redux";
import { IWeather, IWeatherPayload } from "../../../model/trip/weather/Weather";
import { WeatherBusinessStore } from "../../../service/business/weather/WeatherBusinessStore";
import { useEffect } from "react";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip } from "../../../model/trip/Trip";
import React from "react";
import WeatherView from "./WeatherView";
export interface IWeatherContainerOwnProps {}

export interface IWeatherContainerStateProps {
  currentWeather: IWeather;
  predictedWeather: IWeather;
  trip: ITrip;
}
export interface IWeatherContainerDispatchProps {
  currentWeatherFetch: (weatherPayload: IWeatherPayload) => void;
  currentWeatherClear: () => void;
  predictedWeatherFetch: (weatherPayload: IWeatherPayload) => void;
  predictedWeatherClear: () => void;
}
type IWeatherContainerProps = IWeatherContainerOwnProps &
  IWeatherContainerStateProps &
  IWeatherContainerDispatchProps;

const WeatherContainer: React.FC<IWeatherContainerProps> = (
  props: IWeatherContainerProps
) => {
  useEffect(() => {
    props.currentWeatherFetch({
      lat: props.trip.location.y,
      lon: props.trip.location.x,
    });

    // same date, but one year ago
    const currentDate = new Date();
    const futureDateFrom = new Date(props.trip.dateFrom);
    const futureDateTo = new Date(props.trip.dateTo);
    const oneYearAgoDateFrom = new Date(
      currentDate.getFullYear() - 1,
      futureDateFrom.getMonth(),
      futureDateFrom.getDate()
    );
    const oneYearAgoDateTo = new Date(
      currentDate.getFullYear() - 1,
      futureDateTo.getMonth(),
      futureDateTo.getDate()
    );
    props.predictedWeatherFetch({
      lat: props.trip.location.y,
      lon: props.trip.location.x,

      timestampFrom: oneYearAgoDateFrom.getTime() / 1000,
      timestampTo: oneYearAgoDateTo.getTime() / 1000,
    });
    return () => {
      props.currentWeatherClear();
      props.predictedWeatherClear();
    };
  }, [props.trip]);

  return (
    <WeatherView
      currentWeather={props.currentWeather}
      predictedWeather={props.predictedWeather}
    />
  );
};

const mapStateToProps = (state: any): IWeatherContainerStateProps => ({
  currentWeather: WeatherBusinessStore.selectors.getCurrentWeather(state),
  predictedWeather: WeatherBusinessStore.selectors.getPredictedWeather(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IWeatherContainerDispatchProps => ({
  currentWeatherFetch: (weatherPayload: IWeatherPayload) =>
    dispatch(WeatherBusinessStore.actions.currentWeatherFetch(weatherPayload)),
  currentWeatherClear: () =>
    dispatch(WeatherBusinessStore.actions.currentWeatherClear()),
  predictedWeatherFetch: (weatherPayload: IWeatherPayload) =>
    dispatch(
      WeatherBusinessStore.actions.predictedWeatherFetch(weatherPayload)
    ),
  predictedWeatherClear: () =>
    dispatch(WeatherBusinessStore.actions.predictedWeatherClear()),
});

export default connect<
  IWeatherContainerStateProps,
  IWeatherContainerDispatchProps,
  IWeatherContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(WeatherContainer);
