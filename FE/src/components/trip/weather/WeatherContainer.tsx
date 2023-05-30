import { connect } from "react-redux";
import { IWeather, IWeatherPayload } from "../../../model/trip/weather/Weather";
import { TripWeatherBusinessStore } from "../../../service/business/trip/weather/TripWeatherBusinessStore";
import { useEffect } from "react";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip } from "../../../model/trip/Trip";
import ReactWeather from "react-open-weather";
export interface IWeatherContainerOwnProps {}

export interface IWeatherContainerStateProps {
  currentTripWeather: IWeather;
  currentTrip: ITrip;
}
export interface IWeatherContainerDispatchProps {
  tripWeatherFetch: (weatherPayload: IWeatherPayload) => void;
  tripWeatherClear: () => void;
}
type IWeatherContainerProps = IWeatherContainerOwnProps &
  IWeatherContainerStateProps &
  IWeatherContainerDispatchProps;

const WeatherContainer: React.FC<IWeatherContainerProps> = (
  props: IWeatherContainerProps
) => {
  useEffect(() => {
    props.tripWeatherFetch({
      isHistory: false,
      lat: props.currentTrip.location.y,
      lon: props.currentTrip.location.x,
    });
    return () => {
      props.tripWeatherClear();
    };
  }, [props.currentTrip]);

  return (
    <ReactWeather
      data={props.currentTripWeather}
      lang="en"
      locationLabel={props.currentTripWeather?.name}
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
  );
};

const mapStateToProps = (state: any): IWeatherContainerStateProps => ({
  currentTripWeather:
    TripWeatherBusinessStore.selectors.getCurrentWeather(state),
  currentTrip: TripBusinessStore.selectors.getCurrentTrip(state),
});

const mapDispatchToProps = (dispatch: any): IWeatherContainerDispatchProps => ({
  tripWeatherFetch: (weatherPayload: IWeatherPayload) =>
    dispatch(TripWeatherBusinessStore.actions.tripWeatherFetch(weatherPayload)),

  tripWeatherClear: () =>
    dispatch(TripWeatherBusinessStore.actions.tripWeatherClear()),
});

export default connect<
  IWeatherContainerStateProps,
  IWeatherContainerDispatchProps,
  IWeatherContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(WeatherContainer);
