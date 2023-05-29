import { Avatar, Col, Form, Radio } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { IReminderType } from "../../../model/reminder/Reminder";
import basic from "../../asset/img/basic.jpg";
import warm from "../../asset/img/warm.jpg";
import cold from "../../asset/img/cold.jpg";
export interface ISecondStepOwnProps {
  isHidden: boolean;
}

type ISecondStepProps = ISecondStepOwnProps;

const SecondStep: React.FC<ISecondStepProps> = (props: ISecondStepProps) => {
  return (
    <Col className="fullWidth" hidden={props.isHidden}>
      <Title level={2} className="font-neutral" hidden={props.isHidden}>
        Which describes your trip you the best?
      </Title>
      <Form.Item
        name={"reminderType"}
        className="fullWidth"
        hidden={props.isHidden}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button
            value={IReminderType.DEFAULT}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={basic} alt="defaultReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5} className="secondStep__reminderTitle">
              Basic
            </Title>
          </Radio.Button>
          <Radio.Button
            value={IReminderType.WARM}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={warm} alt="warmReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5} className="secondStep__reminderTitle">
              Warm
            </Title>
          </Radio.Button>
          <Radio.Button
            value={IReminderType.COLD}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={cold} alt="coldReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5} className="secondStep__reminderTitle">
              Cold
            </Title>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
  );
};

export default SecondStep;
