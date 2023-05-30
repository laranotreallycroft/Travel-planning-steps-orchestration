import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { MISCELLANEOUS } from "../../../../model/trip/const/packingList";
import CustomInput from "../../../common/input/CustomDropdownInput";

export interface IMiscellaneousOwnProps {}
type IMiscellaneousProps = IMiscellaneousOwnProps;

const Miscellaneous: React.FC<IMiscellaneousProps> = (
  props: IMiscellaneousProps
) => {
  return (
    <React.Fragment>
      <Title level={4}>Miscellaneous</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={5}>Documents</Title>
          <CustomInput
            group="miscellaneous"
            subgroup="documents"
            initialItems={MISCELLANEOUS.documents}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Bags</Title>
          <CustomInput
            group="miscellaneous"
            subgroup="bags"
            initialItems={MISCELLANEOUS.bags}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Miscellaneous</Title>
          <CustomInput
            group="miscellaneous"
            subgroup="miscellaneous"
            initialItems={MISCELLANEOUS.miscellaneous}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Technology</Title>
          <CustomInput
            group="miscellaneous"
            subgroup="technology"
            initialItems={MISCELLANEOUS.technology}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Work</Title>
          <CustomInput
            group="miscellaneous"
            subgroup="work"
            initialItems={MISCELLANEOUS.work}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Miscellaneous;
