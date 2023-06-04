import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import SightseeingCreateView from "./SightseeingCreateView";

export interface ISightseeingCreateContainerOwnProps {}

export interface ISightseeingCreateContainerStateProps {
  trip: ITrip;
}
export interface ISightseeingCreateContainerDispatchProps {}
type ISightseeingCreateContainerProps = ISightseeingCreateContainerOwnProps &
  ISightseeingCreateContainerStateProps &
  ISightseeingCreateContainerDispatchProps;

const SightseeingCreateContainer: React.FC<ISightseeingCreateContainerProps> = (
  props: ISightseeingCreateContainerProps
) => {
  return <SightseeingCreateView trip={props.trip} />;
};

const mapStateToProps = (
  state: any
): ISightseeingCreateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingCreateContainerDispatchProps => ({});

export default connect<
  ISightseeingCreateContainerStateProps,
  ISightseeingCreateContainerDispatchProps,
  ISightseeingCreateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingCreateContainer);
