import { Button, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { ITripUpdatePayload } from "../../../model/trip/settings/Settings";

export interface ITripSettingsViewOwnProps {
  trip: ITrip;
  onTripUpdate: (tripUpdatePayload: ITripUpdatePayload) => void;
}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

const TripSettingsView: React.FC<ITripSettingsViewProps> = (
  props: ITripSettingsViewProps
) => {
  const [form] = Form.useForm<ITripUpdatePayload>();
  useEffect(() => {
    form.setFieldsValue(props.trip);
  }, [props.trip]);

  const handleFinish = (values: ITripUpdatePayload) => {
    props.onTripUpdate(values);
  };
  return (
    <Form<ITripUpdatePayload>
      form={form}
      onFinish={handleFinish}
      initialValues={props.trip}
    >
      <Title level={4}>Trip settings</Title>
      <Row justify={"end"}>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Row>

      <Form.Item
        name={"name"}
        label={"Trip name"}
        className="tripSettingsView__formItem"
      >
        <Input />
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
