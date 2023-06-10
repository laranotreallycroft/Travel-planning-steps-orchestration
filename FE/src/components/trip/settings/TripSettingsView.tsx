import { Button, DatePicker, Form, Input, Popconfirm, Row } from "antd";
import Title from "antd/es/typography/Title";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useEffect } from "react";
import { ITrip } from "../../../model/trip/Trip";

export interface ITripSettingsViewOwnProps {
  trip: ITrip;
  onTripUpdate: (tripUpdatePayload: ITripSettingsForm) => void;
  onTripDelete: () => void;
}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

export interface ITripSettingsForm {
  name: string;
  dateRange: RangeValue<Dayjs>;
}
const TripSettingsView: React.FC<ITripSettingsViewProps> = (
  props: ITripSettingsViewProps
) => {
  const [form] = Form.useForm<ITripSettingsForm>();
  useEffect(() => {
    form.setFieldsValue({
      name: props.trip.name,
      dateRange: [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)],
    });
  }, [props.trip]);

  const handleFinish = (values: ITripSettingsForm) => {
    props.onTripUpdate(values);
  };
  return (
    <Form<ITripSettingsForm>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        name: props.trip.name,
        dateRange: [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)],
      }}
    >
      <Title level={4}>Trip settings</Title>
      <Row justify={"end"}>
        <Popconfirm
          title="Delete trip"
          description="Are you sure to delete this trip?"
          onConfirm={props.onTripDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
        <Button type="primary" onClick={form.submit} className="margin-left-sm">
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
      <Form.Item name={"dateRange"} label={"Travel dates"}>
        <DatePicker.RangePicker allowClear={false} />
      </Form.Item>
    </Form>
  );
};

export default TripSettingsView;
