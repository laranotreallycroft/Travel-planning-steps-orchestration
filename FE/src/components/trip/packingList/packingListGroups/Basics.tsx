import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { BASICS } from "../../../../model/trip/const/packingList";
import CustomInput from "../../../common/input/CustomDropdownInput";

export interface IBasicsOwnProps {}
type IBasicsProps = IBasicsOwnProps;

const Basics: React.FC<IBasicsProps> = (props: IBasicsProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Basics</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={5}>Travel Aids</Title>
          <CustomInput
            group="basics"
            subgroup="travelAids"
            initialItems={BASICS.travelAids}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Funds</Title>
          <CustomInput
            group="basics"
            subgroup="funds"
            initialItems={BASICS.funds}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Travel Info</Title>
          <CustomInput
            group="basics"
            subgroup="travelInfo"
            initialItems={BASICS.travelInfo}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Basics;
