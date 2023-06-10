import { Button, DatePicker, Form, Input, Popconfirm, Row } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import React, { useCallback, useEffect } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { ITripCreateForm } from "../create/TripCreateView";
import MapSearch from "../../common/map/MapSearch";
import { IGeosearchPayload } from "../../common/map/MapElement";

export interface ITripSettingsViewOwnProps {
  trip: ITrip;
  onTripUpdate: (tripUpdatePayload: ITripSettingsForm) => void;
  onTripDelete: () => void;
}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

export interface ITripSettingsForm extends ITripCreateForm {
  label: string;
}
const TripSettingsView: React.FC<ITripSettingsViewProps> = (
  props: ITripSettingsViewProps
) => {
  const [form] = Form.useForm<ITripSettingsForm>();
  useEffect(() => {
    form.setFieldsValue({
      label: props.trip.label,
      dateRange: [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)],
    });
  }, [props.trip]);
  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    form.setFieldValue("location", parsedValue);
  }, []);
  return (
    <Form<ITripSettingsForm>
      form={form}
      onFinish={props.onTripUpdate}
      initialValues={{
        label: props.trip.label,
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
        name={"label"}
        label={"Trip name"}
        className="tripSettingsView__formItem"
      >
        <Input />
      </Form.Item>
      <Form.Item name={"dateRange"} label={"Travel dates"}>
        <DatePicker.RangePicker allowClear={false} />
      </Form.Item>
      <Form.Item
        name={"location"}
        label={"Travel destination"}
        className="fullWidth"
      >
        <MapSearch
          onSelectLocation={handleSelectLocation}
          showValueAfterSearch={true}
          initialValue={props.trip.locationLabel}
        />
      </Form.Item>
    </Form>
  );
};

export default TripSettingsView;
