import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import SightseeingCreateView from "./SightseeingCreateView";
import {
  ISightseeingRouteCreatePayload,
  SightseeingBusinessStore,
} from "../../../../service/business/sightseeing/SightseeingBusinessStore";

export interface ISightseeingCreateContainerOwnProps {
  date: string;
  isSightseeingCreateModalOpen: boolean;
  onSightseeingCreateModalClose: () => void;
}

export interface ISightseeingCreateContainerStateProps {
  trip: ITrip;
}
export interface ISightseeingCreateContainerDispatchProps {
  sightseeingRouteCreate: (
    sightseeingRoutePayload: ISightseeingRouteCreatePayload
  ) => void;
}
type ISightseeingCreateContainerProps = ISightseeingCreateContainerOwnProps &
  ISightseeingCreateContainerStateProps &
  ISightseeingCreateContainerDispatchProps;

const SightseeingCreateContainer: React.FC<ISightseeingCreateContainerProps> = (
  props: ISightseeingCreateContainerProps
) => {
  return (
    <SightseeingCreateView
      trip={props.trip}
      onSightseeingCreateModalClose={props.onSightseeingCreateModalClose}
      isSightseeingCreateModalOpen={props.isSightseeingCreateModalOpen}
      onSightseeingCreate={props.sightseeingRouteCreate}
    />
  );
};

const mapStateToProps = (
  state: any
): ISightseeingCreateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingCreateContainerDispatchProps => ({
  sightseeingRouteCreate: (
    sightseeingRoutePayload: ISightseeingRouteCreatePayload
  ) =>
    dispatch(
      SightseeingBusinessStore.actions.sightseeingRouteCreate(
        sightseeingRoutePayload
      )
    ),
});

export default connect<
  ISightseeingCreateContainerStateProps,
  ISightseeingCreateContainerDispatchProps,
  ISightseeingCreateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingCreateContainer);
