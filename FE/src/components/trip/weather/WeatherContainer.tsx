import WeatherView from 'components/trip/weather/WeatherView';
import { ITrip } from 'model/trip/Trip';
import { IWeather, IWeatherPayload } from 'model/trip/weather/Weather';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { WeatherBusinessStore } from 'service/business/weather/WeatherBusinessStore';
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
  const [selectedYear, setselectedYear] = useState<number>(new Date().getFullYear() - 1);

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
    const pastDateFrom = new Date(selectedYear, futureDateFrom.getMonth(), futureDateFrom.getDate());

    props.pastWeatherFetch({
      lat: props.trip.location.coordinates.y,
      lon: props.trip.location.coordinates.x,
      timestamp: pastDateFrom.getTime() / 1000,
    });

    return () => {
      props.pastWeatherClear();
    };
  }, [props.trip.dateFrom, props.trip.dateTo, props.trip.location.coordinates, selectedYear]);

  return <WeatherView currentWeather={props.currentWeather} pastWeather={props.pastWeather} selectedYear={selectedYear} setSelectedYear={setselectedYear} />;
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
