import TripCreateModal from 'components/trip/create/TripCreateModal';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { ITripCreatePayload, TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface ITripCreateContainerOwnProps {
  onTripCreateModalClose: () => void;
}

export interface ITripCreateContainerStateProps {}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (payload: ITripCreatePayload) => ITrackableAction;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps & ITripCreateContainerStateProps & ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (props: ITripCreateContainerProps) => {
  const handleTripCreate = useCallback(
    (payload: ITripCreatePayload) => {
      props
        .tripCreate(payload)
        .track()
        .subscribe(() => {
          props.onTripCreateModalClose();
        });
    },
    [props.tripCreate]
  );
  return <TripCreateModal onTripCreate={handleTripCreate} onTripCreateModalClose={props.onTripCreateModalClose} />;
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) => dispatch(createTrackableAction(TripBusinessStore.actions.tripCreate(tripCreatePayload))),
});

export default connect<ITripCreateContainerStateProps, ITripCreateContainerDispatchProps, ITripCreateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripCreateContainer);
