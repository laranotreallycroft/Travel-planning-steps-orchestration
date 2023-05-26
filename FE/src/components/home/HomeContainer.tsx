import { connect } from "react-redux";
import React, { useEffect } from "react";
import { ITrip } from "../../model/trip/Trip";
import { UserBusinessStore } from "../../service/business/user/UserBusinessStore";
import HomeView from "./HomeView";

export interface IHomeContainerOwnProps {}
export interface IHomeContainerStateProps {
  userTrips: ITrip[];
}
export interface IHomeContainerDispatchProps {
  userTripsFetch: () => void;
}
type IHomeContainerProps = IHomeContainerOwnProps &
  IHomeContainerStateProps &
  IHomeContainerDispatchProps;

const HomeContainer: React.FC<IHomeContainerProps> = (
  props: IHomeContainerProps
) => {
  useEffect(() => {
    props.userTripsFetch();
  }, []);

  const handleTripSelect = (selectedTrip: ITrip) => {
    console.log(selectedTrip);
  };

  return (
    <HomeView userTrips={props.userTrips} onTripSelect={handleTripSelect} />
  );
};

const mapStateToProps = (state: any): IHomeContainerStateProps => ({
  userTrips: UserBusinessStore.selectors.getUserTrips(state),
});

const mapDispatchToProps = (dispatch: any): IHomeContainerDispatchProps => ({
  userTripsFetch: () => dispatch(UserBusinessStore.actions.userTripsFetch()),
});

export default connect<
  IHomeContainerStateProps,
  IHomeContainerDispatchProps,
  IHomeContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
