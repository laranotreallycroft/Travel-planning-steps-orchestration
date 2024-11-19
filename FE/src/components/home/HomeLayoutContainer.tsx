import HomeLayoutView from 'components/home/HomeLayoutView';
import { ITrip } from 'model/trip/Trip';
import { IUserCredentials } from 'model/user/User';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { IIdPayload } from 'service/business/common/types';
import { LoginBusinessStore } from 'service/business/login/LoginBusinessStore';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { UserTripsBusinessStore } from 'service/business/user/UserTripsBusinessStore';

export interface IHomeLayoutContainerOwnProps {}
export interface IHomeLayoutContainerStateProps {
  userTrips: ITrip[];
  trip: ITrip;
  isUserLoggedIn: boolean;
  user: IUserCredentials;
}
export interface IHomeLayoutContainerDispatchProps {
  userTripsFetch: () => void;
  userTripsClear: () => void;
  tripFetch: (payload: IIdPayload) => void;
  tripClear: () => void;
  logout: () => void;
}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps & IHomeLayoutContainerStateProps & IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (props: IHomeLayoutContainerProps) => {
  useEffect(() => {
    props.userTripsFetch();
    return () => {
      props.userTripsClear();
      props.tripClear();
    };
  }, [props.user]);

  const handleTripSelect = useCallback((selectedTripId: number) => {
    props.tripFetch({ id: selectedTripId });
  }, []);

  return <HomeLayoutView userTrips={props.userTrips} trip={props.trip} isUserLoggedIn={props.isUserLoggedIn} onTripSelect={handleTripSelect} onLogout={props.logout} />;
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({
  userTrips: UserTripsBusinessStore.selectors.getUserTrips(state),
  trip: TripBusinessStore.selectors.getTrip(state),
  user: UserTripsBusinessStore.selectors.getUser(state),
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): IHomeLayoutContainerDispatchProps => ({
  userTripsFetch: () => dispatch(UserTripsBusinessStore.actions.userTripsFetch()),
  userTripsClear: () => dispatch(UserTripsBusinessStore.actions.userTripsClear()),
  tripFetch: (payload: IIdPayload) => dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripClear: () => dispatch(TripBusinessStore.actions.tripClear()),
  logout: () => dispatch(LoginBusinessStore.actions.logout()),
});

export default connect<IHomeLayoutContainerStateProps, IHomeLayoutContainerDispatchProps, IHomeLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(HomeLayoutContainer);
