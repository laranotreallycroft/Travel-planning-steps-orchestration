import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { CLOTHES } from "../../../../model/trip/const/packingList";
import CustomInput from "../../../common/input/CustomDropdownInput";

export interface IClothesOwnProps {}
type IClothesProps = IClothesOwnProps;

const Clothes: React.FC<IClothesProps> = (props: IClothesProps) => {
  return (
    <React.Fragment>
      <Title level={4}>Clothes</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={5}>Basics</Title>
          <CustomInput
            group="clothes"
            subgroup="basics"
            initialItems={CLOTHES.basics}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Dressy</Title>
          <CustomInput
            group="clothes"
            subgroup="dressy"
            initialItems={CLOTHES.dressy}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Outerwear</Title>
          <CustomInput
            group="clothes"
            subgroup="outerwear"
            initialItems={CLOTHES.outerwear}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Casual</Title>
          <CustomInput
            group="clothes"
            subgroup="casual"
            initialItems={CLOTHES.casual}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Footwear</Title>
          <CustomInput
            group="clothes"
            subgroup="footwear"
            initialItems={CLOTHES.footwear}
          />
        </Col>
        <Col span={6}>
          <Title level={5}>Accessories</Title>
          <CustomInput
            group="clothes"
            subgroup="accessories"
            initialItems={CLOTHES.accessories}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Clothes;
