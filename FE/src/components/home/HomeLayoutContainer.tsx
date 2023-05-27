import { connect } from "react-redux";
import React, { useEffect } from "react";
import { ITrip } from "../../model/trip/Trip";
import { UserBusinessStore } from "../../service/business/user/UserBusinessStore";
import HomeView from "./HomeLayoutView";
import { TripBusinessStore } from "../../service/business/trip/TripBusinessStore";
import { IIdPayload } from "../../service/business/common/types";

export interface IHomeLayoutContainerOwnProps {}
export interface IHomeLayoutContainerStateProps {
  userTrips: ITrip[];
  currentTrip: ITrip;
}
export interface IHomeLayoutContainerDispatchProps {
  userTripsFetch: () => void;
  tripFetch: (payload: IIdPayload) => void;
  tripUpdate: (payload: ITrip) => void;
}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps &
  IHomeLayoutContainerStateProps &
  IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (
  props: IHomeLayoutContainerProps
) => {
  useEffect(() => {
    props.userTripsFetch();
  }, []);

  const handleTripSelect = (selectedTripId: number) => {
    props.tripFetch({ id: selectedTripId });
  };

  const handleTripUpdate = (trip: ITrip) => {
    props.tripUpdate(trip);
  };

  return (
    <HomeView
      userTrips={props.userTrips}
      selectedTrip={props.currentTrip}
      onTripSelect={handleTripSelect}
      onTripUpdate={handleTripUpdate}
    />
  );
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({
  userTrips: UserBusinessStore.selectors.getUserTrips(state),
  currentTrip: TripBusinessStore.selectors.getCurrentTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IHomeLayoutContainerDispatchProps => ({
  userTripsFetch: () => dispatch(UserBusinessStore.actions.userTripsFetch()),
  tripFetch: (payload: IIdPayload) =>
    dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripUpdate: (payload: ITrip) =>
    dispatch(TripBusinessStore.actions.tripUpdate(payload)),
});

export default connect<
  IHomeLayoutContainerStateProps,
  IHomeLayoutContainerDispatchProps,
  IHomeLayoutContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayoutContainer);
