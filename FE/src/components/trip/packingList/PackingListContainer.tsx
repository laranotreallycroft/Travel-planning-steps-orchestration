import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { PackingListBusinessStore } from "../../../service/business/trip/packingList/PackingListBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../service/util/trackAction";
import PackingListCreateView from "./PackingListCreateView";
import PackingListUpdateView from "./PackingListUpdateView";
import PackingListView from "./PackingListView";

export interface IPackingListContainerOwnProps {}
export interface IPackingListContainerStateProps {
  packingList: IPackingList;
  packingListChecked: IPackingList;
  trip: ITrip;
}
export interface IPackingListContainerDispatchProps {
  packingListCreate: (packingListCreatePayload: IPackingList) => void;
  packingListFetch: () => void;
  packingListUpdate: (
    packingListUpdatePayload: IPackingList
  ) => ITrackableAction;
  packingListCheckedFetch: () => void;
  packingListCheckedUpdate: (
    packingListCheckedUpdatePayload: IPackingList
  ) => ITrackableAction;
}
type IPackingListContainerProps = IPackingListContainerOwnProps &
  IPackingListContainerStateProps &
  IPackingListContainerDispatchProps;

const PackingListContainer: React.FC<IPackingListContainerProps> = (
  props: IPackingListContainerProps
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    props.packingListFetch();
  }, [props.trip]);

  useEffect(() => {
    props.packingListCheckedFetch();
  }, [props.trip, props.packingList]);

  const handlePackingListUpdate = (values: IPackingList) => {
    props
      .packingListUpdate(values)
      .track()
      .subscribe(() => setIsEditing(false));
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
          packingListChecked={props.packingListChecked}
          editPackingList={() => setIsEditing(true)}
          onPackingListCheckedUpdate={props.packingListCheckedUpdate}
        />
      )}
      {props.packingList === null && (
        <PackingListCreateView onPackingListCreate={props.packingListCreate} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IPackingListContainerStateProps => ({
  packingList: PackingListBusinessStore.selectors.getPackingList(state),
  packingListChecked:
    PackingListBusinessStore.selectors.getPackingListChecked(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IPackingListContainerDispatchProps => ({
  packingListCreate: (packingListCreatePayload: IPackingList) =>
    dispatch(
      PackingListBusinessStore.actions.packingListCreate(
        packingListCreatePayload
      )
    ),
  packingListFetch: () =>
    dispatch(PackingListBusinessStore.actions.packingListFetch()),
  packingListUpdate: (packingListUpdatePayload: IPackingList) =>
    dispatch(
      createTrackableAction(
        PackingListBusinessStore.actions.packingListUpdate(
          packingListUpdatePayload
        )
      )
    ),
  packingListCheckedFetch: () =>
    dispatch(PackingListBusinessStore.actions.packingListCheckedFetch()),
  packingListCheckedUpdate: (packingListCheckedUpdatePayload: IPackingList) =>
    dispatch(
      createTrackableAction(
        PackingListBusinessStore.actions.packingListCheckedUpdate(
          packingListCheckedUpdatePayload
        )
      )
    ),
});

export default connect<
  IPackingListContainerStateProps,
  IPackingListContainerDispatchProps,
  IPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(PackingListContainer);
