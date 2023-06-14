import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";
import { ITrip } from "../../../../model/trip/Trip";
import PackingListCopyView, {
  IPackingListCopyForm,
} from "./PackingListCopyView";
import PackingListCreateView, {
  IPackingListCreateForm,
} from "./PackingListCreateView";
export interface IPackingListHeaderOwnProps {
  trip: ITrip;
  userTrips?: ITrip[];
  onPackingListCreate: (
    packingListCreatePayload: IPackingListCreateForm
  ) => void;
  onPackingListCopy: (packingListCopyPayload: IPackingListCopyForm) => void;
  toggleEdit: () => void;
}
type IPackingListHeaderProps = IPackingListHeaderOwnProps;

const PackingListHeader: React.FC<IPackingListHeaderProps> = (
  props: IPackingListHeaderProps
) => {
  return (
    <Row justify={"end"} gutter={16}>
      <PackingListCreateView onPackingListCreate={props.onPackingListCreate} />
      <PackingListCopyView
        trip={props.trip}
        userTrips={props.userTrips}
        onPackingListCopy={props.onPackingListCopy}
      />

      <Col>
        <Button
          type="primary"
          onClick={props.toggleEdit}
          icon={<EditOutlined />}
        >
          {"Edit"}
        </Button>
      </Col>
    </Row>
  );
};

export default PackingListHeader;
