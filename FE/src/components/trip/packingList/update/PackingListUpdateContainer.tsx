import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import {
  IPackingListUpdateCombinedPayload,
  IPackingListUpdatePayload,
  PackingListBusinessStore,
} from "../../../../service/business/trip/packingList/PackingListBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../../service/util/trackAction";
import PackingListUpdateView from "./PackingListUpdateView";

export interface IPackingListUpdateContainerOwnProps {
  toggleEdit: () => void;
}
export interface IPackingListUpdateContainerStateProps {
  trip: ITrip;
}
export interface IPackingListUpdateContainerDispatchProps {
  packingListUpdate: (
    packingListUpdatePayload: IPackingListUpdateCombinedPayload
  ) => ITrackableAction;
}
type IPackingListUpdateContainerProps = IPackingListUpdateContainerOwnProps &
  IPackingListUpdateContainerStateProps &
  IPackingListUpdateContainerDispatchProps;

const PackingListUpdateContainer: React.FC<IPackingListUpdateContainerProps> = (
  props: IPackingListUpdateContainerProps
) => {
  let changedPackingLists: Map<number, string[]> = new Map();
  let deletedPackingLists: number[] = [];
  const handlePackingListChange = useCallback(
    (payload: IPackingListUpdatePayload) => {
      changedPackingLists.set(payload.packingListId, payload.items);
    },
    [changedPackingLists]
  );

  const handlePackingListDelete = useCallback(
    (packingListId: number) => {
      deletedPackingLists.push(packingListId);
    },
    [deletedPackingLists]
  );

  const handlePackingListUpdate = useCallback(() => {
    let updatePayloadArray: IPackingListUpdatePayload[] = [];
    changedPackingLists.forEach((items: string[], packingListId: number) => {
      const payload: IPackingListUpdatePayload = {
        packingListId,
        items,
      };
      updatePayloadArray.push(payload);
    });
    if (updatePayloadArray.length > 0 || deletedPackingLists.length > 0)
      props
        .packingListUpdate({
          update: updatePayloadArray,
          delete: deletedPackingLists,
        })
        .track()
        .subscribe({
          next: () => {
            props.toggleEdit();
          },
          error: () => {},
        });
  }, [changedPackingLists]);

  const handleCancel = () => {
    props.toggleEdit();
  };
  return (
    <React.Fragment>
      <Row justify={"end"}>
        <Button type="primary" onClick={handleCancel} icon={<CloseOutlined />}>
          {"Cancel"}
        </Button>
        <Button
          type="primary"
          onClick={handlePackingListUpdate}
          icon={<SaveOutlined />}
          className="margin-left-sm"
        >
          {"Save"}
        </Button>
      </Row>
      <PackingListUpdateView
        packingLists={props.trip.packingLists}
        onPackingListChange={handlePackingListChange}
        onPackingListDelete={handlePackingListDelete}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: any
): IPackingListUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IPackingListUpdateContainerDispatchProps => ({
  packingListUpdate: (
    packingListUpdatePayload: IPackingListUpdateCombinedPayload
  ) =>
    dispatch(
      createTrackableAction(
        PackingListBusinessStore.actions.packingListUpdate(
          packingListUpdatePayload
        )
      )
    ),
});

export default connect<
  IPackingListUpdateContainerStateProps,
  IPackingListUpdateContainerDispatchProps,
  IPackingListUpdateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(PackingListUpdateContainer);
