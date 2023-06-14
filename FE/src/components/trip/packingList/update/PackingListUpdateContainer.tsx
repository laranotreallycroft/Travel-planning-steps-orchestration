import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import {
  IPackingListUpdatePayload,
  PackingListBusinessStore,
} from "../../../../service/business/trip/packingList/PackingListBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../../service/util/trackAction";
import PackingListUpdateView from "./PackingListUpdateView";
import { Button, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";

export interface IPackingListUpdateContainerOwnProps {
  toggleEdit: () => void;
}
export interface IPackingListUpdateContainerStateProps {
  trip: ITrip;
}
export interface IPackingListUpdateContainerDispatchProps {
  packingListUpdate: (
    packingListUpdatePayload: IPackingListUpdatePayload[]
  ) => ITrackableAction;
}
type IPackingListUpdateContainerProps = IPackingListUpdateContainerOwnProps &
  IPackingListUpdateContainerStateProps &
  IPackingListUpdateContainerDispatchProps;

const PackingListUpdateContainer: React.FC<IPackingListUpdateContainerProps> = (
  props: IPackingListUpdateContainerProps
) => {
  let changedPackingLists: Map<number, string[]> = new Map();

  const handlePackingListChange = useCallback(
    (payload: IPackingListUpdatePayload) => {
      changedPackingLists.set(payload.packingListId, payload.items);
    },
    [changedPackingLists]
  );

  const handlePackingListUpdate = useCallback(() => {
    let payloadArray: IPackingListUpdatePayload[] = [];
    changedPackingLists.forEach((items: string[], packingListId: number) => {
      const payload: IPackingListUpdatePayload = {
        packingListId,
        items,
      };
      payloadArray.push(payload);
    });
    props
      .packingListUpdate(payloadArray)
      .track()
      .subscribe({
        next: () => {
          props.toggleEdit();
        },
        error: () => {},
      });
  }, [changedPackingLists]);
  return (
    <React.Fragment>
      <Row justify={"end"} gutter={16}>
        <Button
          type="primary"
          onClick={handlePackingListUpdate}
          icon={<SaveOutlined />}
        >
          {"Save"}
        </Button>
      </Row>
      <PackingListUpdateView
        packingLists={props.trip.packingLists}
        onPackingListChange={handlePackingListChange}
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
  packingListUpdate: (packingListUpdatePayload: IPackingListUpdatePayload[]) =>
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
