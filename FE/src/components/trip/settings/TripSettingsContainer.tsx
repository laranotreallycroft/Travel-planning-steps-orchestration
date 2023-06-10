import { connect } from "react-redux";
import TripSettingsView from "./TripSettingsView";
import { ITripUpdatePayload } from "../../../model/trip/settings/Settings";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip } from "../../../model/trip/Trip";

export interface ITripSettingsContainerOwnProps {}

export interface ITripSettingsContainerStateProps {
  trip: ITrip;
}
export interface ITripSettingsContainerDispatchProps {
  tripUpdate: (tripUpdatePayload: ITripUpdatePayload) => void;
  tripDelete: () => void;
}
type ITripSettingsContainerProps = ITripSettingsContainerOwnProps &
  ITripSettingsContainerStateProps &
  ITripSettingsContainerDispatchProps;

const TripSettingsContainer: React.FC<ITripSettingsContainerProps> = (
  props: ITripSettingsContainerProps
) => {
  return (
    <TripSettingsView
      trip={props.trip}
      onTripUpdate={props.tripUpdate}
      onTripDelete={props.tripDelete}
    />
  );
};

const mapStateToProps = (state: any): ITripSettingsContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ITripSettingsContainerDispatchProps => ({
  tripUpdate: (tripUpdatePayload: ITripUpdatePayload) =>
    dispatch(TripBusinessStore.actions.tripUpdate(tripUpdatePayload)),
  tripDelete: () => dispatch(TripBusinessStore.actions.tripDelete()),
});

export default connect<
  ITripSettingsContainerStateProps,
  ITripSettingsContainerDispatchProps,
  ITripSettingsContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripSettingsContainer);
