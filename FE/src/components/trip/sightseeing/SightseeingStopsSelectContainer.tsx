import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { ISightseeingRoutePayload } from "../../../model/trip/sightseeing/Sightseeing";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import SightseeingStopsSelectView from "./SightseeingStopsSelectView";

export interface ISightseeingStopsSelectContainerOwnProps {
  onNextStep: () => void;
}

export interface ISightseeingStopsSelectContainerStateProps {
  trip: ITrip;
}
export interface ISightseeingStopsSelectContainerDispatchProps {}
type ISightseeingStopsSelectContainerProps =
  ISightseeingStopsSelectContainerOwnProps &
    ISightseeingStopsSelectContainerStateProps &
    ISightseeingStopsSelectContainerDispatchProps;

const SightseeingStopsSelectContainer: React.FC<
  ISightseeingStopsSelectContainerProps
> = (props: ISightseeingStopsSelectContainerProps) => {
  const handleSightseeingStopsSelect = (values: ISightseeingRoutePayload) => {
    console.log(values);
    //   props.onNextStep();
  };

  return (
    <SightseeingStopsSelectView
      selectedLocation={{ ...props.trip.location, label: props.trip.name }}
      onSightseeingStopsSelect={handleSightseeingStopsSelect}
    />
  );
};

const mapStateToProps = (
  state: any
): ISightseeingStopsSelectContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingStopsSelectContainerDispatchProps => ({});

export default connect<
  ISightseeingStopsSelectContainerStateProps,
  ISightseeingStopsSelectContainerDispatchProps,
  ISightseeingStopsSelectContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingStopsSelectContainer);
