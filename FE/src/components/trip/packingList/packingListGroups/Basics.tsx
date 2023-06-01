import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import CustomDropdownInput from "../../../common/input/CustomDropdownInput";
import CustomCheckboxInput from "../../../common/input/CustomCheckboxGroup";
import { IBasics } from "../../../../model/trip/packingList/PackingList";

export interface IBasicsOwnProps {
  isEditing: boolean;
  packingList: IBasics;
}
type IBasicsProps = IBasicsOwnProps;

const Basics: React.FC<IBasicsProps> = (props: IBasicsProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Basics</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={5}>Travel Aids</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="basics"
              subgroup="travelAids"
              initialItems={props.packingList.travelAids}
            />
          ) : (
            <CustomCheckboxInput
              group="basics"
              subgroup="travelAids"
              initialItems={props.packingList.travelAids}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Funds</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="basics"
              subgroup="funds"
              initialItems={props.packingList.funds}
            />
          ) : (
            <CustomCheckboxInput
              group="basics"
              subgroup="funds"
              initialItems={props.packingList.funds}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Travel Info</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="basics"
              subgroup="travelInfo"
              initialItems={props.packingList.travelInfo}
            />
          ) : (
            <CustomCheckboxInput
              group="basics"
              subgroup="travelInfo"
              initialItems={props.packingList.travelInfo}
            />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Basics;
