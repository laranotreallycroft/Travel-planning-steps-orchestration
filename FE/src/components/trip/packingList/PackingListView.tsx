import { Col, Row } from "antd";
import React from "react";
import { IPackingList } from "model/trip/packingList/PackingList";
import { IPackingListUpdatePayload } from "service/business/trip/packingList/PackingListBusinessStore";
import CustomCheckboxInput from "components/common/input/CustomCheckboxInput";

export interface IPackingListViewOwnProps {
  packingLists?: IPackingList[];
  onPackingListChecked: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) => void;
}
type IPackingListViewProps = IPackingListViewOwnProps;

const PackingListView: React.FC<IPackingListViewProps> = (
  props: IPackingListViewProps
) => {
  return (
    <Row gutter={16}>
      {props.packingLists?.map((packingList) => {
        return (
          <Col span={6} key={packingList.id}>
            <CustomCheckboxInput
              packingList={packingList}
              onPackingListChecked={props.onPackingListChecked}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default PackingListView;
