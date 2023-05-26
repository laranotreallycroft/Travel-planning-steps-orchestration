import { Col, Form, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { BASICS } from "../../../model/reminder/const";

export interface IBasicsOwnProps {
  isHidden: boolean;
}
type IBasicsProps = IBasicsOwnProps;

const Basics: React.FC<IBasicsProps> = (props: IBasicsProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Basics
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Travel Aids
          </Title>
          <Form.Item name={["reminders", "basics", "travelAids"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={BASICS.travelAids}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Funds
          </Title>
          <Form.Item name={["reminders", "basics", "funds"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={BASICS.funds}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Travel Info
          </Title>
          <Form.Item name={["reminders", "basics", "travelInfo"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={BASICS.travelInfo}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Basics;
