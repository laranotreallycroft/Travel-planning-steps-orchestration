import React, { useCallback, useState } from "react";
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
  trip: ITrip;
}
export interface IPackingListContainerDispatchProps {
  packingListCreate: (packingListCreatePayload: IPackingList) => void;

  packingListUpdate: (
    packingListUpdatePayload: IPackingList
  ) => ITrackableAction;
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

  const toggleEdit = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  const handlePackingListUpdate = useCallback((values: IPackingList) => {
    props.packingListUpdate(values).track().subscribe(toggleEdit);
  }, []);

  return (
    <React.Fragment>
      {props.trip.packingList && isEditing && (
        <PackingListUpdateView
          packingList={props.trip.packingList}
          onPackingListUpdate={handlePackingListUpdate}
        />
      )}
      {props.trip.packingList &&
        props.trip.packingListChecked &&
        !isEditing && (
          <PackingListView
            packingList={props.trip.packingList}
            packingListChecked={props.trip.packingListChecked}
            editPackingList={toggleEdit}
            onPackingListCheckedUpdate={props.packingListCheckedUpdate}
          />
        )}
      {props.trip.packingList === null && (
        <PackingListCreateView onPackingListCreate={props.packingListCreate} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IPackingListContainerStateProps => ({
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

  packingListUpdate: (packingListUpdatePayload: IPackingList) =>
    dispatch(
      createTrackableAction(
        PackingListBusinessStore.actions.packingListUpdate(
          packingListUpdatePayload
        )
      )
    ),

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
