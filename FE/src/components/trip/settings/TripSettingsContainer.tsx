import TripSettingsView from 'components/trip/settings/TripSettingsView';
import { ITrip, ITripCreatePayload } from 'model/trip/Trip';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';

export interface ITripSettingsContainerOwnProps {}

export interface ITripSettingsContainerStateProps {
  trip: ITrip;
}
export interface ITripSettingsContainerDispatchProps {
  tripUpdate: (tripUpdatePayload: ITrip) => void;
  tripDelete: () => void;
}
type ITripSettingsContainerProps = ITripSettingsContainerOwnProps & ITripSettingsContainerStateProps & ITripSettingsContainerDispatchProps;

const TripSettingsContainer: React.FC<ITripSettingsContainerProps> = (props: ITripSettingsContainerProps) => {
  const handleTripUpdate = useCallback((values: ITrip) => {
    props.tripUpdate(values);
  }, []);
  return <TripSettingsView trip={props.trip} onTripUpdate={handleTripUpdate} onTripDelete={props.tripDelete} />;
};

const mapStateToProps = (state: any): ITripSettingsContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): ITripSettingsContainerDispatchProps => ({
  tripUpdate: (tripUpdatePayload: ITripCreatePayload) => dispatch(TripBusinessStore.actions.tripUpdate(tripUpdatePayload)),
  tripDelete: () => dispatch(TripBusinessStore.actions.tripDelete()),
});

export default connect<ITripSettingsContainerStateProps, ITripSettingsContainerDispatchProps, ITripSettingsContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripSettingsContainer);
