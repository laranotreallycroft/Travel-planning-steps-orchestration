import { connect } from 'react-redux';
import { IWeather, IWeatherPayload } from 'model/trip/weather/Weather';
import { WeatherBusinessStore } from 'service/business/weather/WeatherBusinessStore';
import { useEffect, useState } from 'react';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { ITrip } from 'model/trip/Trip';
import React from 'react';
import WeatherView from 'components/trip/weather/WeatherView';
export interface IWeatherContainerOwnProps {}

export interface IWeatherContainerStateProps {
  currentWeather: IWeather;
  pastWeather: IWeather;
  trip: ITrip;
}

export interface IWeatherContainerDispatchProps {
  currentWeatherFetch: (weatherPayload: IWeatherPayload) => void;
  currentWeatherClear: () => void;
  pastWeatherFetch: (weatherPayload: IWeatherPayload) => void;
  pastWeatherClear: () => void;
}

type IWeatherContainerProps = IWeatherContainerOwnProps & IWeatherContainerStateProps & IWeatherContainerDispatchProps;

const WeatherContainer: React.FC<IWeatherContainerProps> = (props: IWeatherContainerProps) => {
  const [selectedYear, setselectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    props.currentWeatherFetch({
      lat: props.trip.location.coordinates.y,
      lon: props.trip.location.coordinates.x,
    });

    return () => {
      props.currentWeatherClear();
    };
  }, [props.trip.location.coordinates]);

  useEffect(() => {
    const futureDateFrom = new Date(props.trip.dateFrom);
    const futureDateTo = new Date(props.trip.dateTo);
    const pastDateFrom = new Date(selectedYear, futureDateFrom.getMonth(), futureDateFrom.getDate());
    const pastDateTo = new Date(selectedYear, futureDateTo.getMonth(), futureDateTo.getDate());

    props.pastWeatherFetch({
      lat: props.trip.location.coordinates.y,
      lon: props.trip.location.coordinates.x,

      timestampFrom: pastDateFrom.getTime() / 1000,
      timestampTo: pastDateTo.getTime() / 1000,
    });

    return () => {
      props.pastWeatherClear();
    };
  }, [props.trip.dateFrom, props.trip.dateTo, props.trip.location.coordinates, selectedYear]);

  return <React.Fragment>{props.pastWeather && props.currentWeather && <WeatherView currentWeather={props.currentWeather} pastWeather={props.pastWeather} selectedYear={selectedYear} setSelectedYear={setselectedYear} />} </React.Fragment>;
};

const mapStateToProps = (state: any): IWeatherContainerStateProps => ({
  currentWeather: WeatherBusinessStore.selectors.getCurrentWeather(state),
  pastWeather: WeatherBusinessStore.selectors.getPastWeather(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IWeatherContainerDispatchProps => ({
  currentWeatherFetch: (weatherPayload: IWeatherPayload) => dispatch(WeatherBusinessStore.actions.currentWeatherFetch(weatherPayload)),
  currentWeatherClear: () => dispatch(WeatherBusinessStore.actions.currentWeatherClear()),
  pastWeatherFetch: (weatherPayload: IWeatherPayload) => dispatch(WeatherBusinessStore.actions.pastWeatherFetch(weatherPayload)),
  pastWeatherClear: () => dispatch(WeatherBusinessStore.actions.pastWeatherClear()),
});

export default connect<IWeatherContainerStateProps, IWeatherContainerDispatchProps, IWeatherContainerOwnProps>(mapStateToProps, mapDispatchToProps)(WeatherContainer);
