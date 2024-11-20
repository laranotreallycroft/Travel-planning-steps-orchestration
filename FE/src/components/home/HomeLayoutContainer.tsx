import HomeLayoutView from 'components/home/HomeLayoutView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { IIdPayload } from 'service/business/common/types';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { UserTripsBusinessStore } from 'service/business/user/UserTripsBusinessStore';

export interface IHomeLayoutContainerOwnProps {}
export interface IHomeLayoutContainerStateProps {
  userTrips: ITrip[];
  trip: ITrip;
}
export interface IHomeLayoutContainerDispatchProps {
  userTripsFetch: () => void;
  userTripsClear: () => void;
  tripFetch: (payload: IIdPayload) => void;
  tripClear: () => void;
}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps & IHomeLayoutContainerStateProps & IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (props: IHomeLayoutContainerProps) => {
  useEffect(() => {
    props.userTripsFetch();
    return () => {
      props.userTripsClear();
      props.tripClear();
    };
  }, []);

  const handleTripSelect = useCallback((selectedTripId: number) => {
    props.tripFetch({ id: selectedTripId });
  }, []);

  return <HomeLayoutView userTrips={props.userTrips} trip={props.trip} onTripSelect={handleTripSelect} />;
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({
  userTrips: UserTripsBusinessStore.selectors.getUserTrips(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IHomeLayoutContainerDispatchProps => ({
  userTripsFetch: () => dispatch(UserTripsBusinessStore.actions.userTripsFetch()),
  userTripsClear: () => dispatch(UserTripsBusinessStore.actions.userTripsClear()),
  tripFetch: (payload: IIdPayload) => dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripClear: () => dispatch(TripBusinessStore.actions.tripClear()),
});

export default connect<IHomeLayoutContainerStateProps, IHomeLayoutContainerDispatchProps, IHomeLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(HomeLayoutContainer);
