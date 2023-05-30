import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import { TripPackingListBusinessStore } from "../../../service/business/trip/packingList/TripPackingListBusinessStore";
import TripPackingListCreateView from "./PackingListCreateView";
import TripPackingListUpdateView from "./PackingListUpdateView";
import PackingListView from "./PackingListView";
import { ITrip } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";

export interface ITripPackingListContainerOwnProps {}
export interface ITripPackingListContainerStateProps {
  currentTripPackingList: IPackingList;
  currentTrip: ITrip;
}
export interface ITripPackingListContainerDispatchProps {
  tripPackingListCreate: (packingListCreatePayload: IPackingList) => void;
  tripPackingListFetch: () => void;
  tripPackingListUpdate: (packingListUpdatePayload: IPackingList) => void;
  tripPackingListClear: () => void;
}
type ITripPackingListContainerProps = ITripPackingListContainerOwnProps &
  ITripPackingListContainerStateProps &
  ITripPackingListContainerDispatchProps;

const TripPackingListContainer: React.FC<ITripPackingListContainerProps> = (
  props: ITripPackingListContainerProps
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    props.tripPackingListFetch();
    return () => {
      props.tripPackingListClear();
    };
  }, [props.currentTrip]);

  const handlePackingListUpdate = (values: IPackingList) => {
    setIsEditing(false);
    // props.tripPackingListUpdate(values);
  };

  return (
    <React.Fragment>
      {props.currentTripPackingList !== null && isEditing && (
        <TripPackingListUpdateView
          currentTripPackingList={props.currentTripPackingList}
          onTripPackingListUpdate={handlePackingListUpdate}
        />
      )}
      {props.currentTripPackingList !== null && !isEditing && (
        <PackingListView
          currentTripPackingList={props.currentTripPackingList}
          editPackingList={() => setIsEditing(true)}
          onTripPackingListUpdate={props.tripPackingListUpdate}
        />
      )}
      {props.currentTripPackingList === null && (
        <TripPackingListCreateView
          onTripPackingListCreate={props.tripPackingListCreate}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): ITripPackingListContainerStateProps => ({
  currentTripPackingList:
    TripPackingListBusinessStore.selectors.getCurrentPackingList(state),
  currentTrip: TripBusinessStore.selectors.getCurrentTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): ITripPackingListContainerDispatchProps => ({
  tripPackingListCreate: (packingListCreatePayload: IPackingList) =>
    dispatch(
      TripPackingListBusinessStore.actions.tripPackingListCreate(
        packingListCreatePayload
      )
    ),
  tripPackingListFetch: () =>
    dispatch(TripPackingListBusinessStore.actions.tripPackingListFetch()),
  tripPackingListUpdate: (packingListUpdatePayload: IPackingList) =>
    dispatch(
      TripPackingListBusinessStore.actions.tripPackingListUpdate(
        packingListUpdatePayload
      )
    ),
  tripPackingListClear: () =>
    dispatch(TripPackingListBusinessStore.actions.tripPackingListClear()),
});

export default connect<
  ITripPackingListContainerStateProps,
  ITripPackingListContainerDispatchProps,
  ITripPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripPackingListContainer);
