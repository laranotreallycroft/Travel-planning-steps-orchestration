import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import CustomDropdownInput from "../../../common/input/CustomDropdownInput";
import CustomCheckboxInput from "../../../common/input/CustomCheckboxGroup";
import { IClothes } from "../../../../model/trip/packingList/PackingList";

export interface IClothesOwnProps {
  isEditing: boolean;
  packingList: IClothes;
}
type IClothesProps = IClothesOwnProps;

const Clothes: React.FC<IClothesProps> = (props: IClothesProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Clothes</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={5}>Basics</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="basics"
              initialItems={props.packingList.basics}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="basics"
              initialItems={props.packingList.basics}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Dressy</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="dressy"
              initialItems={props.packingList.dressy}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="dressy"
              initialItems={props.packingList.dressy}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Outerwear</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="outerwear"
              initialItems={props.packingList.outerwear}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="outerwear"
              initialItems={props.packingList.outerwear}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Casual</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="casual"
              initialItems={props.packingList.casual}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="casual"
              initialItems={props.packingList.casual}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Footwear</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="footwear"
              initialItems={props.packingList.footwear}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="footwear"
              initialItems={props.packingList.footwear}
            />
          )}
        </Col>
        <Col span={6}>
          <Title level={5}>Accessories</Title>
          {props.isEditing ? (
            <CustomDropdownInput
              group="clothes"
              subgroup="accessories"
              initialItems={props.packingList.accessories}
            />
          ) : (
            <CustomCheckboxInput
              group="clothes"
              subgroup="accessories"
              initialItems={props.packingList.accessories}
            />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Clothes;
