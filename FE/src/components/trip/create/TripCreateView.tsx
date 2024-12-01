import { DatePicker, Form, Input, Modal } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import MapElement from 'components/common/map/MapElement';
import MapSearch from 'components/common/map/MapSearch';
import { Dayjs } from 'dayjs';
import { IGeosearchData } from 'model/geometry/Coordinates';
import { ITripCreatePayload } from 'model/trip/Trip';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useCallback, useState } from 'react';

export interface ITripCreateViewOwnProps {
  onTripCreate: (values: ITripCreatePayload) => void;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateForm {
  label: string;
  dateRange: RangeValue<Dayjs>;
  location: IGeosearchData;
}

type ITripCreateViewProps = ITripCreateViewOwnProps & IWithLocalizeOwnProps;

const TripCreateView: React.FC<ITripCreateViewProps> = (props: ITripCreateViewProps) => {
  const [form] = Form.useForm<ITripCreateForm>();
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchData>();

  const handleFinish = useCallback(
    (values: ITripCreateForm) => {
      const payload: ITripCreatePayload = {
        label: values.label,
        dateFrom: values.dateRange?.[0]?.format('YYYY-MM-DD')!,
        dateTo: values.dateRange?.[1]?.format('YYYY-MM-DD')!,
        location: values.location,
      };
      props.onTripCreateModalClose();
      props.onTripCreate(payload);
    },
    [props.onTripCreateModalClose, props.onTripCreate]
  );

  return (
    <Modal title={props.translate('TRIP_CREATE_VIEW.MODAL_TITLE')} open={true} onCancel={props.onTripCreateModalClose} onOk={form.submit} className="tripCreateView__modal">
      <Form<ITripCreateForm> form={form} onFinish={handleFinish} requiredMark={false} className="margin-top-lg" layout="vertical">
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
          <MapSearch onChange={setSelectedLocation} showValueAfterSearch={true} />
        </Form.Item>
        <MapElement selectedLocation={selectedLocation} locationList={selectedLocation ? [[selectedLocation]] : undefined} />
      </Form>
    </Modal>
  );
};

export default withLocalize<ITripCreateViewOwnProps>(TripCreateView as any);
