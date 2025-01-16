import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Popconfirm, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCreateForm from 'components/trip/create/TripCreateForm';
import dayjs, { Dayjs } from 'dayjs';
import { ILocation } from 'model/geometry/Coordinates';
import { ITrip } from 'model/trip/Trip';
import { RangeValue } from 'rc-picker/lib/interface';
import React, { useCallback, useMemo } from 'react';
import { ITripCreatePayload, ITripUpdatePayload } from 'service/business/trip/TripBusinessStore';

export interface ITripCreateModalOwnProps {
  trip: ITrip;
  onTripUpdate: (values: ITripUpdatePayload) => void;
  onTripDelete: () => void;
}

export interface ITripCreateForm {
  label: string;
  dateRange: RangeValue<Dayjs>;
  location: ILocation;
}

type ITripCreateModalProps = ITripCreateModalOwnProps & IWithLocalizeOwnProps;

const TripCreateModal: React.FC<ITripCreateModalProps> = (props: ITripCreateModalProps) => {
  const [form] = Form.useForm<ITripCreateForm>();

  const initialValues: ITripCreateForm = useMemo(() => {
    const dateRange: RangeValue<Dayjs> = [dayjs(props.trip.dateFrom), dayjs(props.trip.dateTo)];
    return {
      label: props.trip.label,
      location: props.trip.location,
      dateRange: dateRange,
    };
  }, [props.trip]);

  const handleSubmit = useCallback(
    (values: ITripCreatePayload) => {
      props.onTripUpdate({ ...values, id: props.trip.id });
    },
    [props.onTripUpdate, props.trip.id]
  );

  return (
    <React.Fragment>
      <TripCreateForm initialValues={initialValues} formRef={form} onSubmit={handleSubmit} />
      <Row justify={'end'} gutter={[16, 16]} className="margin-top-lg">
        <Col>
          <Popconfirm title={props.translate('TRIP_EDIT_VIEW.DELETE_TRIP.TITLE')} description={props.translate('TRIP_EDIT_VIEW.DELETE_TRIP.DESCRIPTION')} onConfirm={props.onTripDelete} okText={props.translate('COMMON.YES')} cancelText={props.translate('COMMON.NO')} placement="topRight">
            <Button danger icon={<DeleteOutlined />}>
              {props.translate('COMMON.DELETE')}
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Button type="primary" onClick={form.submit}>
            {props.translate('COMMON.FORM.SUBMIT')}
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withLocalize<ITripCreateModalOwnProps>(TripCreateModal as any);
