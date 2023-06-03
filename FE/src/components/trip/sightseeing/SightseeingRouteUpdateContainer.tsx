import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { ISightseeingRoutePayload } from "../../../model/trip/sightseeing/Sightseeing";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import SightseeingRouteUpdateView from "./SightseeingRouteUpdateView";

export interface ISightseeingRouteUpdateContainerOwnProps {}

export interface ISightseeingRouteUpdateContainerStateProps {
  trip: ITrip;
}
export interface ISightseeingRouteUpdateContainerDispatchProps {}
type ISightseeingRouteUpdateContainerProps =
  ISightseeingRouteUpdateContainerOwnProps &
    ISightseeingRouteUpdateContainerStateProps &
    ISightseeingRouteUpdateContainerDispatchProps;

const SightseeingRouteUpdateContainer: React.FC<
  ISightseeingRouteUpdateContainerProps
> = (props: ISightseeingRouteUpdateContainerProps) => {
  const handleSightseeingRouteUpdate = (values: ISightseeingRoutePayload) => {
    console.log(values);
  };

  return (
    <SightseeingRouteUpdateView
      selectedLocation={{ ...props.trip.location, label: props.trip.name }}
      onSightseeingRouteUpdate={handleSightseeingRouteUpdate}
    />
  );
};

const mapStateToProps = (
  state: any
): ISightseeingRouteUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingRouteUpdateContainerDispatchProps => ({});

export default connect<
  ISightseeingRouteUpdateContainerStateProps,
  ISightseeingRouteUpdateContainerDispatchProps,
  ISightseeingRouteUpdateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingRouteUpdateContainer);
