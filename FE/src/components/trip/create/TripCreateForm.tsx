import { DatePicker, Form, FormInstance, Input } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import MapElement from 'components/common/map/MapElement';
import MapSearch from 'components/common/map/MapSearch';
import { Dayjs } from 'dayjs';
import { ILocation } from 'model/geometry/Coordinates';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useCallback, useState } from 'react';
import { ITripCreatePayload } from 'service/business/trip/TripBusinessStore';

export interface ITripCreateFormOwnProps {
  formRef?: FormInstance<ITripCreateForm>;
  initialValues?: ITripCreateForm;
  onSubmit: (values: ITripCreatePayload) => void;
}

export interface ITripCreateForm {
  label: string;
  dateRange: RangeValue<Dayjs>;
  location: ILocation;
}

type ITripCreateFormProps = ITripCreateFormOwnProps & IWithLocalizeOwnProps;

const TripCreateForm: React.FC<ITripCreateFormProps> = (props: ITripCreateFormProps) => {
  const [form] = Form.useForm<ITripCreateForm>(props.formRef);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | undefined>(props.initialValues?.location);

  const handleFinish = useCallback(
    (values: ITripCreateForm) => {
      const payload: ITripCreatePayload = {
        label: values.label,
        dateFrom: values.dateRange?.[0]?.format('YYYY-MM-DD')!,
        dateTo: values.dateRange?.[1]?.format('YYYY-MM-DD')!,
        location: values.location,
      };
      props.onSubmit(payload);
    },
    [props.onSubmit]
  );

  return (
    <Form<ITripCreateForm> form={form} initialValues={props.initialValues} onFinish={handleFinish} requiredMark={false} className="margin-top-lg" layout="vertical">
      <Form.Item
        name={'label'}
        label={props.translate('TRIP_CREATE_VIEW.FORM.LABEL.LABEL')}
        rules={[
          {
            required: true,
            message: '',
          },
        ]}
      >
        <Input placeholder={props.translate('TRIP_CREATE_VIEW.FORM.LABEL.PLACEHOLDER')} />
      </Form.Item>
      <Form.Item
        name={'dateRange'}
        label={props.translate('TRIP_CREATE_VIEW.FORM.DATE_RANGE.LABEL')}
        rules={[
          {
            required: true,
            message: '',
          },
        ]}
      >
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item
        name={'location'}
        label={props.translate('TRIP_CREATE_VIEW.FORM.LOCATION.LABEL')}
        rules={[
          {
            required: true,
            message: '',
          },
        ]}
      >
        <MapSearch onChange={setSelectedLocation} initialValue={props.initialValues?.location.label} />
      </Form.Item>
      <MapElement selectedLocation={selectedLocation} locationList={selectedLocation ? [[selectedLocation]] : undefined} />
    </Form>
  );
};

export default withLocalize<ITripCreateFormOwnProps>(TripCreateForm as any);
