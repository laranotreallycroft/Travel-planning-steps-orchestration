import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import { PackingListBusinessStore } from "../../../service/business/trip/packingList/PackingListBusinessStore";
import PackingListCreateView from "./PackingListCreateView";
import PackingListUpdateView from "./PackingListUpdateView";
import PackingListView from "./PackingListView";
import { ITrip } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../service/util/trackAction";

export interface IPackingListContainerOwnProps {}
export interface IPackingListContainerStateProps {
  packingList: IPackingList;
  trip: ITrip;
}
export interface IPackingListContainerDispatchProps {
  tripPackingListCreate: (packingListCreatePayload: IPackingList) => void;
  tripPackingListFetch: () => void;
  tripPackingListUpdate: (
    packingListUpdatePayload: IPackingList
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
    props.tripPackingListFetch();
  }, [props.trip]);

  const handlePackingListUpdate = (values: IPackingList) => {
    props
      .tripPackingListUpdate(values)
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
      createTrackableAction(
        PackingListBusinessStore.actions.tripPackingListUpdate(
          packingListUpdatePayload
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
