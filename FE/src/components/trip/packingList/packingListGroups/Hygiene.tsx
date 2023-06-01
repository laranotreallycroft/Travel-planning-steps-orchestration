import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import CustomDropdownInput from "../../../common/input/CustomDropdownInput";
import CustomCheckboxInput from "../../../common/input/CustomCheckboxGroup";
import { IHygiene } from "../../../../model/trip/packingList/PackingList";

export interface IHygieneOwnProps {
  isEditing: boolean;
  packingList: IHygiene;
}
type IHygieneProps = IHygieneOwnProps;

const Hygiene: React.FC<IHygieneProps> = (props: IHygieneProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Hygiene</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>Hygiene</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="hygiene"
              subgroup="hygiene"
              initialItems={props.packingList.hygiene}
            />
          ) : (
            <CustomCheckboxInput
              group="hygiene"
              subgroup="hygiene"
              initialItems={props.packingList.hygiene}
              className="customCheckboxGroup__hygiene"
            />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Hygiene;
