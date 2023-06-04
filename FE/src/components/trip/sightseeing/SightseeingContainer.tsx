import { connect } from "react-redux";
import SightseeingDateView from "./SightseeingView";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip } from "../../../model/trip/Trip";
import SightseeingView from "./SightseeingView";

export interface ISightseeingContainerOwnProps {}

export interface ISightseeingContainerStateProps {
  trip: ITrip;
}
export interface ISightseeingContainerDispatchProps {}
type ISightseeingContainerProps = ISightseeingContainerOwnProps &
  ISightseeingContainerStateProps &
  ISightseeingContainerDispatchProps;

const SightseeingContainer: React.FC<ISightseeingContainerProps> = (
  props: ISightseeingContainerProps
) => {
  return <SightseeingView sightseeingList={props.trip.sightseeing} />;
};

const mapStateToProps = (state: any): ISightseeingContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingContainerDispatchProps => ({});

export default connect<
  ISightseeingContainerStateProps,
  ISightseeingContainerDispatchProps,
  ISightseeingContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingContainer);
