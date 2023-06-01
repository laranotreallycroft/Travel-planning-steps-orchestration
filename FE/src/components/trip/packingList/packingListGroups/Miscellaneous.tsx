import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import CustomDropdownInput from "../../../common/input/CustomDropdownInput";
import CustomCheckboxInput from "../../../common/input/CustomCheckboxGroup";
import { IMiscellaneous } from "../../../../model/trip/packingList/PackingList";

export interface IMiscellaneousOwnProps {
  isEditing: boolean;
  packingList: IMiscellaneous;
}
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
          {props.isEditing ? (
            <CustomDropdownInput
              group="miscellaneous"
              subgroup="documents"
              initialItems={props.packingList.documents}
            />
          ) : (
            <CustomCheckboxInput
              group="miscellaneous"
              subgroup="documents"
              initialItems={props.packingList.documents}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Bags</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="miscellaneous"
              subgroup="bags"
              initialItems={props.packingList.bags}
            />
          ) : (
            <CustomCheckboxInput
              group="miscellaneous"
              subgroup="bags"
              initialItems={props.packingList.bags}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Miscellaneous</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="miscellaneous"
              subgroup="miscellaneous"
              initialItems={props.packingList.miscellaneous}
            />
          ) : (
            <CustomCheckboxInput
              group="miscellaneous"
              subgroup="miscellaneous"
              initialItems={props.packingList.miscellaneous}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Technology</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="miscellaneous"
              subgroup="technology"
              initialItems={props.packingList.technology}
            />
          ) : (
            <CustomCheckboxInput
              group="miscellaneous"
              subgroup="technology"
              initialItems={props.packingList.technology}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Work</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="miscellaneous"
              subgroup="work"
              initialItems={props.packingList.work}
            />
          ) : (
            <CustomCheckboxInput
              group="miscellaneous"
              subgroup="work"
              initialItems={props.packingList.work}
            />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Miscellaneous;
