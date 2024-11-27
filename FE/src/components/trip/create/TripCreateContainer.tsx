import TripCreateView from 'components/trip/create/TripCreateView';
import { ITripCreatePayload } from 'model/trip/Trip';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { TripListBusinessStore } from 'service/business/user/TripListBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface ITripCreateContainerOwnProps {
  onTripCreateModalClose: () => void;
}

export interface ITripCreateContainerStateProps {}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (payload: ITripCreatePayload) => ITrackableAction;
  tripListFetch: () => void;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps & ITripCreateContainerStateProps & ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (props: ITripCreateContainerProps) => {
  return <TripCreateView onTripCreate={props.tripCreate} onTripCreateModalClose={props.onTripCreateModalClose} />;
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) => dispatch(createTrackableAction(TripBusinessStore.actions.tripCreate(tripCreatePayload))),

  tripListFetch: () => dispatch(TripListBusinessStore.actions.tripListFetch()),
});

export default connect<ITripCreateContainerStateProps, ITripCreateContainerDispatchProps, ITripCreateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripCreateContainer);
