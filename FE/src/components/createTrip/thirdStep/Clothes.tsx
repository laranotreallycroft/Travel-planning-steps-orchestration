import Title from "antd/es/typography/Title";
import React from "react";
import { Col, Form, Row, Select } from "antd";
import { CLOTHES } from "../../../model/reminder/const";

export interface IClothesOwnProps {
  isHidden: boolean;
}
type IClothesProps = IClothesOwnProps;

const Clothes: React.FC<IClothesProps> = (props: IClothesProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Clothes
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Basics
          </Title>
          <Form.Item name={["reminders", "clothes", "basics"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.basics}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Dressy
          </Title>
          <Form.Item name={["reminders", "clothes", "dressy"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.dressy}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Outerwear
          </Title>
          <Form.Item name={["reminders", "clothes", "outerwear"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.outerwear}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Casual
          </Title>
          <Form.Item name={["reminders", "clothes", "casual"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.casual}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Footwear
          </Title>
          <Form.Item name={["reminders", "clothes", "footwear"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.footwear}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Accessories
          </Title>
          <Form.Item name={["reminders", "clothes", "accessories"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={CLOTHES.accessories}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Clothes;
