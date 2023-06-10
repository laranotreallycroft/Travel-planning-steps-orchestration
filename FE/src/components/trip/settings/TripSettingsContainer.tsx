import { connect } from "react-redux";
import TripSettingsView, { ITripSettingsForm } from "./TripSettingsView";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ITrip, ITripPayload } from "../../../model/trip/Trip";
import { useCallback } from "react";

export interface ITripSettingsContainerOwnProps {}

export interface ITripSettingsContainerStateProps {
  trip: ITrip;
}
export interface ITripSettingsContainerDispatchProps {
  tripUpdate: (tripUpdatePayload: ITripPayload) => void;
  tripDelete: () => void;
}
type ITripSettingsContainerProps = ITripSettingsContainerOwnProps &
  ITripSettingsContainerStateProps &
  ITripSettingsContainerDispatchProps;

const TripSettingsContainer: React.FC<ITripSettingsContainerProps> = (
  props: ITripSettingsContainerProps
) => {
  const handleTripUpdate = useCallback((values: ITripSettingsForm) => {
    const payload: ITripPayload = {
      label: values.label,
      dateFrom: values.dateRange?.[0]?.format("YYYY-MM-DD")!,
      dateTo: values.dateRange?.[1]?.format("YYYY-MM-DD")!,
      location: {
        x: values.location?.x ?? props.trip.location.x,
        y: values.location?.y ?? props.trip.location.y,
      },
      locationLabel: values.location?.label ?? props.trip.locationLabel,
    };

    props.tripUpdate(payload);
  }, []);
  return (
    <TripSettingsView
      trip={props.trip}
      onTripUpdate={handleTripUpdate}
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
  tripUpdate: (tripUpdatePayload: ITripPayload) =>
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
