import { Button, DatePicker, Form, Input, Popconfirm, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import MapSearch from 'components/common/map/MapSearch';
import { ITripCreateForm } from 'components/trip/create/TripCreateView';
import dayjs from 'dayjs';
import { IGeosearchData } from 'model/geometry/Coordinates';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect } from 'react';

export interface ITripSettingsViewOwnProps {
  trip: ITrip;
  onTripUpdate: (tripUpdatePayload: ITrip) => void;
  onTripDelete: () => void;
}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

export interface ITripSettingsForm extends ITripCreateForm {
  label: string;
}
const TripSettingsView: React.FC<ITripSettingsViewProps> = (props: ITripSettingsViewProps) => {
  const [form] = Form.useForm<ITripSettingsForm>();
  useEffect(() => {
    form.setFieldsValue({
      label: props.trip.label,
      dateRange: [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)],
    });
  }, [props.trip]);
  const handleSelectLocation = useCallback((value?: IGeosearchData | IGeosearchData[]) => {
    // const parsedValue: IGeosearchPayload = JSON.parse(value);
    //  form.setFieldValue('location', parsedValue);
  }, []);

  const handleFinish = useCallback(
    (values: ITripSettingsForm) => {
      /* const payload: ITripUpdatePayload = {
        label: values.label,
        dateFrom: values.dateRange?.[0]?.format('YYYY-MM-DD')!,
        dateTo: values.dateRange?.[1]?.format('YYYY-MM-DD')!,
        locationLabel: parsedLocation.label ?? props.trip.locationLabel,
        location: {
          x: parsedLocation.x ?? props.trip.location.x,
          y: parsedLocation.y ?? props.trip.location.y,
        },
      };
      props.onTripUpdate(payload);*/
    },
    [props.onTripUpdate, props.trip]
  );

  return (
    <Form<ITripSettingsForm>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        label: props.trip.label,
        dateRange: [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)],
      }}
    >
      <Title level={4}>Trip settings</Title>
      <Row justify={'end'}>
        <Popconfirm title="Delete trip" description="Are you sure to delete this trip?" onConfirm={props.onTripDelete} okText="Yes" cancelText="No">
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
        <Button type="primary" onClick={form.submit} className="margin-left-sm">
          Save
        </Button>
      </Row>

      <Form.Item name={'label'} label={'Trip name'} className="tripSettingsView__formItem">
        <Input />
      </Form.Item>
      <Form.Item name={'dateRange'} label={'Travel dates'}>
        <DatePicker.RangePicker allowClear={false} />
      </Form.Item>
      <Form.Item name={'location'} label={'Travel destination'} className="fullWidth">
        <MapSearch onChange={handleSelectLocation} showValueAfterSearch={true} initialValue={props.trip.location.label} />
      </Form.Item>
    </Form>
  );
};

export default TripSettingsView;
