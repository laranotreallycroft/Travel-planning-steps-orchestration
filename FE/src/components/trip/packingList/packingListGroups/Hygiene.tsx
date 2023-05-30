import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { HYGIENE } from "../../../../model/trip/const/packingList";
import CustomInput from "../../../common/input/CustomDropdownInput";

export interface IHygieneOwnProps {}
type IHygieneProps = IHygieneOwnProps;

const Hygiene: React.FC<IHygieneProps> = (props: IHygieneProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Hygiene</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>Hygiene</Title>
          <CustomInput
            group="hygiene"
            subgroup="hygiene"
            initialItems={HYGIENE.hygiene}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Hygiene;
