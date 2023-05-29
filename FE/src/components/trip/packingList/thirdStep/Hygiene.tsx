import Title from "antd/es/typography/Title";
import React from "react";
import { Row, Col, Form, Select } from "antd";
import { HYGIENE } from "../../../../model/reminder/const";

export interface IHygieneOwnProps {
  isHidden: boolean;
}
type IHygieneProps = IHygieneOwnProps;

const Hygiene: React.FC<IHygieneProps> = (props: IHygieneProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Hygiene
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4} className="font-neutral" hidden={props.isHidden}>
            Hygiene
          </Title>
          <Form.Item name={["reminders", "hygiene", "hygiene"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={HYGIENE.hygiene}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Hygiene;
