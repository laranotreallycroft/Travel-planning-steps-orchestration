import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITripCreatePayload } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { UserBusinessStore } from "../../../service/business/user/UserBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../service/util/trackAction";
import TripCreateView, { ITripCreateForm } from "./TripCreateView";

const provider = new OpenStreetMapProvider();

export interface ITripCreateContainerOwnProps {
  isCreateTripModalOpen: boolean;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateContainerStateProps {}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (tripCreatePayload: ITripCreatePayload) => ITrackableAction;
  userTripsFetch: () => void;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps &
  ITripCreateContainerStateProps &
  ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (
  props: ITripCreateContainerProps
) => {
  const navigator = useNavigate();

  const handleTripCreate = useCallback(
    (values: ITripCreateForm) => {
      const payload: ITripCreatePayload = {
        name: values.location.label,
        dateFrom: values.dateRange?.[0]?.format("YYYY-MM-DD")!,
        dateTo: values.dateRange?.[1]?.format("YYYY-MM-DD")!,
        location: { x: values.location.x, y: values.location.y },
      };
      props
        .tripCreate(payload)
        .track()
        .subscribe(() => {
          navigator("/settings");
        });
    },
    [provider.search]
  );
  return (
    <TripCreateView
      isCreateTripModalOpen={props.isCreateTripModalOpen}
      onTripCreate={handleTripCreate}
      onTripCreateModalClose={props.onTripCreateModalClose}
    />
  );
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) =>
    dispatch(
      createTrackableAction(
        TripBusinessStore.actions.tripCreate(tripCreatePayload)
      )
    ),

  userTripsFetch: () => dispatch(UserBusinessStore.actions.userTripsFetch()),
});

export default connect<
  ITripCreateContainerStateProps,
  ITripCreateContainerDispatchProps,
  ITripCreateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripCreateContainer);
