import TripView from 'components/trip/TripView';
import { ITrip } from 'model/trip/Trip';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IIdPayload } from 'service/business/common/types';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';

export interface ITripContainerOwnProps {
  tripId: string;
}
export interface ITripContainerStateProps {
  trip: ITrip;
}
export interface ITripContainerDispatchProps {
  tripFetch: (payload: IIdPayload) => void;
  tripClear: () => void;
}
type ITripContainerProps = ITripContainerOwnProps & ITripContainerStateProps & ITripContainerDispatchProps;

const TripContainer: React.FC<ITripContainerProps> = (props: ITripContainerProps) => {
  useEffect(() => {
    props.tripFetch({ id: props.tripId });

    return () => {
      props.tripClear();
    };
  }, [props.tripId]);

  return <React.Fragment>{props.trip && <TripView trip={props.trip} />}</React.Fragment>;
};

const mapStateToProps = (state: any): ITripContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): ITripContainerDispatchProps => ({
  tripFetch: (payload: IIdPayload) => dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripClear: () => dispatch(TripBusinessStore.actions.tripClear()),
});

export default connect<ITripContainerStateProps, ITripContainerDispatchProps, ITripContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripContainer);
