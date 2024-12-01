import TripCreateView from 'components/trip/create/TripCreateView';
import { ITripCreatePayload } from 'model/trip/Trip';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { TripListBusinessStore } from 'service/business/user/TripListBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface ITripCreateContainerOwnProps {
  onTripCreate?: () => void;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateContainerStateProps {}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (payload: ITripCreatePayload) => ITrackableAction;
  tripListFetch: () => void;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps & ITripCreateContainerStateProps & ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (props: ITripCreateContainerProps) => {
  const handleTripCreate = useCallback(
    (payload: ITripCreatePayload) => {
      props
        .tripCreate(payload)
        .track()
        .subscribe(() => {
          props.onTripCreate?.();
        });
    },
    [props.tripCreate, props.onTripCreate]
  );
  return <TripCreateView onTripCreate={handleTripCreate} onTripCreateModalClose={props.onTripCreateModalClose} />;
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) => dispatch(createTrackableAction(TripBusinessStore.actions.tripCreate(tripCreatePayload))),

  tripListFetch: () => dispatch(TripListBusinessStore.actions.tripListFetch()),
});

export default connect<ITripCreateContainerStateProps, ITripCreateContainerDispatchProps, ITripCreateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripCreateContainer);
