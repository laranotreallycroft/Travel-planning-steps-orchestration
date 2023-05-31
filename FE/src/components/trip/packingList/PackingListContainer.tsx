import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import { PackingListBusinessStore } from "../../../service/business/trip/packingList/PackingListBusinessStore";
import PackingListCreateView from "./PackingListCreateView";
import PackingListUpdateView from "./PackingListUpdateView";
import PackingListView from "./PackingListView";
import { ITrip } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";

export interface IPackingListContainerOwnProps {}
export interface IPackingListContainerStateProps {
  packingList: IPackingList;
  trip: ITrip;
}
export interface IPackingListContainerDispatchProps {
  tripPackingListCreate: (packingListCreatePayload: IPackingList) => void;
  tripPackingListFetch: () => void;
  tripPackingListUpdate: (packingListUpdatePayload: IPackingList) => void;
  tripPackingListClear: () => void;
}
type IPackingListContainerProps = IPackingListContainerOwnProps &
  IPackingListContainerStateProps &
  IPackingListContainerDispatchProps;

const PackingListContainer: React.FC<IPackingListContainerProps> = (
  props: IPackingListContainerProps
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    props.tripPackingListFetch();
    return () => {
      props.tripPackingListClear();
    };
  }, [props.trip]);

  const handlePackingListUpdate = (values: IPackingList) => {
    setIsEditing(false);
    // props.tripPackingListUpdate(values);
  };

  return (
    <React.Fragment>
      {props.packingList !== null && isEditing && (
        <PackingListUpdateView
          packingList={props.packingList}
          onPackingListUpdate={handlePackingListUpdate}
        />
      )}
      {props.packingList !== null && !isEditing && (
        <PackingListView
          packingList={props.packingList}
          editPackingList={() => setIsEditing(true)}
          onPackingListUpdate={props.tripPackingListUpdate}
        />
      )}
      {props.packingList === null && (
        <PackingListCreateView
          onPackingListCreate={props.tripPackingListCreate}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IPackingListContainerStateProps => ({
  packingList: PackingListBusinessStore.selectors.getCurrentPackingList(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IPackingListContainerDispatchProps => ({
  tripPackingListCreate: (packingListCreatePayload: IPackingList) =>
    dispatch(
      PackingListBusinessStore.actions.tripPackingListCreate(
        packingListCreatePayload
      )
    ),
  tripPackingListFetch: () =>
    dispatch(PackingListBusinessStore.actions.tripPackingListFetch()),
  tripPackingListUpdate: (packingListUpdatePayload: IPackingList) =>
    dispatch(
      PackingListBusinessStore.actions.tripPackingListUpdate(
        packingListUpdatePayload
      )
    ),
  tripPackingListClear: () =>
    dispatch(PackingListBusinessStore.actions.tripPackingListClear()),
});

export default connect<
  IPackingListContainerStateProps,
  IPackingListContainerDispatchProps,
  IPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(PackingListContainer);
