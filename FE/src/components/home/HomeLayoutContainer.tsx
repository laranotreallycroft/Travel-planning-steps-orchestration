import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../model/trip/Trip";
import { IUserCredentials } from "../../model/user/User";
import { IIdPayload } from "../../service/business/common/types";
import { LoginBusinessStore } from "../../service/business/login/LoginBusinessStore";
import { TripBusinessStore } from "../../service/business/trip/TripBusinessStore";
import { UserBusinessStore } from "../../service/business/user/UserBusinessStore";
import HomeLayoutView from "./HomeLayoutView";

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
  tripUpdate: (payload: ITrip) => void;
  tripClear: () => void;
  logout: () => void;
}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps &
  IHomeLayoutContainerStateProps &
  IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (
  props: IHomeLayoutContainerProps
) => {
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

  const handleTripUpdate = useCallback((trip: ITrip) => {
    props.tripUpdate(trip);
  }, []);

  return (
    <HomeLayoutView
      userTrips={props.userTrips}
      selectedTrip={props.trip}
      user={props.user}
      isUserLoggedIn={props.isUserLoggedIn}
      onTripSelect={handleTripSelect}
      onTripUpdate={handleTripUpdate}
      onLogout={props.logout}
    />
  );
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({
  userTrips: UserBusinessStore.selectors.getUserTrips(state),
  trip: TripBusinessStore.selectors.getTrip(state),
  user: UserBusinessStore.selectors.getUser(state),
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (
  dispatch: any
): IHomeLayoutContainerDispatchProps => ({
  userTripsFetch: () => dispatch(UserBusinessStore.actions.userTripsFetch()),
  userTripsClear: () => dispatch(UserBusinessStore.actions.userTripsClear()),
  tripFetch: (payload: IIdPayload) =>
    dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripUpdate: (payload: ITrip) =>
    dispatch(TripBusinessStore.actions.tripUpdate(payload)),
  tripClear: () => dispatch(TripBusinessStore.actions.tripClear()),
  logout: () => dispatch(LoginBusinessStore.actions.logout()),
});

export default connect<
  IHomeLayoutContainerStateProps,
  IHomeLayoutContainerDispatchProps,
  IHomeLayoutContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayoutContainer);
