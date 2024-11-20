import TripCreateView, { ITripCreateForm } from 'components/trip/create/TripCreateView';
import { ITripPayload } from 'model/trip/Trip';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { TripListBusinessStore } from 'service/business/user/TripListBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface ITripCreateContainerOwnProps {
  isTripCreateModalOpen: boolean;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateContainerStateProps {}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (tripCreatePayload: ITripPayload) => ITrackableAction;
  tripListFetch: () => void;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps & ITripCreateContainerStateProps & ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (props: ITripCreateContainerProps) => {
  const handleTripCreate = useCallback((values: ITripCreateForm) => {
    const payload: ITripPayload = {
      label: values.location.label,
      locationLabel: values.location.label,
      dateFrom: values.dateRange?.[0]?.format('YYYY-MM-DD')!,
      dateTo: values.dateRange?.[1]?.format('YYYY-MM-DD')!,
      location: { x: values.location.x, y: values.location.y },
    };
    return props.tripCreate(payload);
  }, []);
  return <TripCreateView isTripCreateModalOpen={props.isTripCreateModalOpen} onTripCreate={handleTripCreate} onTripCreateModalClose={props.onTripCreateModalClose} />;
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripPayload) => dispatch(createTrackableAction(TripBusinessStore.actions.tripCreate(tripCreatePayload))),

  tripListFetch: () => dispatch(TripListBusinessStore.actions.tripListFetch()),
});

export default connect<ITripCreateContainerStateProps, ITripCreateContainerDispatchProps, ITripCreateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripCreateContainer);
