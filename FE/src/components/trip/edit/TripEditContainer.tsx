import TripEditView from 'components/trip/edit/TripEditView';
import { ITrip } from 'model/trip/Trip';
import moment from 'moment';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IIdPayload } from 'service/business/common/types';
import { ITripUpdatePayload, TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { createTrackableAction, ITrackableAction } from 'service/util/trackAction';

export interface ITripEditContainerOwnProps {}

export interface ITripEditContainerStateProps {
  trip: ITrip;
}
export interface ITripEditContainerDispatchProps {
  tripUpdate: (payload: ITripUpdatePayload) => void;
  tripDelete: (payload: IIdPayload) => ITrackableAction;
}
type ITripEditContainerProps = ITripEditContainerOwnProps & ITripEditContainerStateProps & ITripEditContainerDispatchProps;

const TripEditContainer: React.FC<ITripEditContainerProps> = (props: ITripEditContainerProps) => {
  const navigator = useNavigate();
  const handleTripUpdate = useCallback((values: ITripUpdatePayload) => {
    props.tripUpdate(values);
  }, []);

  const handleTripDelete = useCallback(() => {
    const isUpcoming = moment(props.trip.dateTo).isAfter();
    props
      .tripDelete({ id: props.trip.id })
      .track()
      .subscribe(() => {
        if (isUpcoming) {
          navigator('/trips/upcoming');
        } else {
          navigator('/trips/past');
        }
      });
  }, [props.trip.id, props.trip.dateTo]);

  return <TripEditView trip={props.trip} onTripUpdate={handleTripUpdate} onTripDelete={handleTripDelete} />;
};

const mapStateToProps = (state: any): ITripEditContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): ITripEditContainerDispatchProps => ({
  tripUpdate: (tripUpdatePayload: ITripUpdatePayload) => dispatch(TripBusinessStore.actions.tripUpdate(tripUpdatePayload)),
  tripDelete: (payload: IIdPayload) => createTrackableAction(dispatch(TripBusinessStore.actions.tripDelete(payload))),
});

export default connect<ITripEditContainerStateProps, ITripEditContainerDispatchProps, ITripEditContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripEditContainer);
