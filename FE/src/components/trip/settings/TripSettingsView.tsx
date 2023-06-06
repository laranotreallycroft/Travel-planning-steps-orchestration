import { Button, Form, Row, Switch } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { ITripSettings } from "../../../model/trip/settings/Settings";

export interface ITripSettingsViewOwnProps {}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

const TripSettingsView: React.FC<ITripSettingsViewProps> = (
  props: ITripSettingsViewProps
) => {
  const [form] = Form.useForm<ITripSettings>();

  const handleFinish = (values: ITripSettings) => {
    console.log(values);
  };
  return (
    <Form<ITripSettings> form={form} onFinish={handleFinish}>
      <Title level={4}>Trip settings</Title>
      <Row justify={"end"}>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Row>
      <Title level={5}>Reminders</Title>
      <Form.Item
        name={["reminders", "packingList"]}
        label={"Get packing list reminder"}
      >
        <Switch />
      </Form.Item>
      <Form.Item name={["reminders", "weather"]} label={"Get weather reminder"}>
        <Switch />
      </Form.Item>
      <Form.Item
        name={["reminders", "itinerary"]}
        label={"Get itinerary reminder"}
      >
        <Switch />
      </Form.Item>
      <Row justify={"end"}>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default TripSettingsView;
