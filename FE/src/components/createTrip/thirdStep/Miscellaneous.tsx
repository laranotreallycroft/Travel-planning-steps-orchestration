import { Col, Form, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { MISCELLANEOUS } from "../../../model/reminder/const";

export interface IMiscellaneousOwnProps {
  isHidden: boolean;
}
type IMiscellaneousProps = IMiscellaneousOwnProps;

const Miscellaneous: React.FC<IMiscellaneousProps> = (
  props: IMiscellaneousProps
) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Miscellaneous
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Documents
          </Title>
          <Form.Item name={["reminders", "miscellaneous", "documents"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={MISCELLANEOUS.documents}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Bags
          </Title>
          <Form.Item name={["reminders", "miscellaneous", "bags"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={MISCELLANEOUS.bags}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Miscellaneous
          </Title>
          <Form.Item name={["reminders", "miscellaneous", "miscellaneous"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={MISCELLANEOUS.miscellaneous}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Technology
          </Title>
          <Form.Item name={["reminders", "miscellaneous", "technology"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={MISCELLANEOUS.technology}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Work
          </Title>
          <Form.Item name={["reminders", "miscellaneous", "work"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={MISCELLANEOUS.work}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Miscellaneous;
