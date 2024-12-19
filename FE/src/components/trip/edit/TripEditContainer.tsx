import TripEditView from 'components/trip/edit/TripEditView';
import { ITrip } from 'model/trip/Trip';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { IIdPayload } from 'service/business/common/types';
import { ITripUpdatePayload, TripBusinessStore } from 'service/business/trip/TripBusinessStore';

export interface ITripEditContainerOwnProps {}

export interface ITripEditContainerStateProps {
  trip: ITrip;
}
export interface ITripEditContainerDispatchProps {
  tripUpdate: (payload: ITripUpdatePayload) => void;
  tripDelete: (payload: IIdPayload) => void;
}
type ITripEditContainerProps = ITripEditContainerOwnProps & ITripEditContainerStateProps & ITripEditContainerDispatchProps;

const TripEditContainer: React.FC<ITripEditContainerProps> = (props: ITripEditContainerProps) => {
  const handleTripUpdate = useCallback((values: ITripUpdatePayload) => {
    props.tripUpdate(values);
  }, []);

  const handleTripDelete = useCallback(() => {
    props.tripDelete({ id: props.trip.id });
  }, [props.trip.id]);

  return <TripEditView trip={props.trip} onTripUpdate={handleTripUpdate} onTripDelete={handleTripDelete} />;
};

const mapStateToProps = (state: any): ITripEditContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): ITripEditContainerDispatchProps => ({
  tripUpdate: (tripUpdatePayload: ITripUpdatePayload) => dispatch(TripBusinessStore.actions.tripUpdate(tripUpdatePayload)),
  tripDelete: (payload: IIdPayload) => dispatch(TripBusinessStore.actions.tripDelete(payload)),
});

export default connect<ITripEditContainerStateProps, ITripEditContainerDispatchProps, ITripEditContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripEditContainer);
