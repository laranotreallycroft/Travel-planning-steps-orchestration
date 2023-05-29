import { connect } from "react-redux";
import TripPackingListView from "./TripPackingListView";
import {
  IPackingList,
  IPackingListCreatePayload,
  IPackingListUpdatePayload,
} from "../../../model/trip/packingList/PackingList";
import { TripPackingListBusinessStore } from "../../../service/business/trip/packingList/TripPackingListBusinessStore";
import { IIdPayload } from "../../../service/business/common/types";

export interface ITripPackingListContainerOwnProps {}
export interface ITripPackingListContainerStateProps {
  currentTripPackingList: IPackingList;
}
export interface ITripPackingListContainerDispatchProps {
  tripPackingListCreate: (
    packingListCreatePayload: IPackingListCreatePayload
  ) => void;
  tripPackingListFetch: (idPayload: IIdPayload) => void;
  tripPackingListUpdate: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) => void;
}
type ITripPackingListContainerProps = ITripPackingListContainerOwnProps &
  ITripPackingListContainerStateProps &
  ITripPackingListContainerDispatchProps;

const TripPackingListContainer: React.FC<ITripPackingListContainerProps> = (
  props: ITripPackingListContainerProps
) => {
  return <TripPackingListView />;
};

const mapStateToProps = (state: any): ITripPackingListContainerStateProps => ({
  currentTripPackingList:
    TripPackingListBusinessStore.selectors.getCurrentPackingList(state),
});

const mapDispatchToProps = (
  dispatch: any
): ITripPackingListContainerDispatchProps => ({
  tripPackingListCreate: (
    packingListCreatePayload: IPackingListCreatePayload
  ) =>
    dispatch(
      TripPackingListBusinessStore.actions.tripPackingListCreate(
        packingListCreatePayload
      )
    ),
  tripPackingListFetch: (idPayload: IIdPayload) =>
    dispatch(
      TripPackingListBusinessStore.actions.tripPackingListFetch(idPayload)
    ),
  tripPackingListUpdate: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) =>
    dispatch(
      TripPackingListBusinessStore.actions.tripPackingListUpdate(
        packingListUpdatePayload
      )
    ),
});

export default connect<
  ITripPackingListContainerStateProps,
  ITripPackingListContainerDispatchProps,
  ITripPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripPackingListContainer);
