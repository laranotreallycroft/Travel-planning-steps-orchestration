import { Form, Modal } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCreateForm from 'components/trip/create/TripCreateForm';
import { Dayjs } from 'dayjs';
import { ILocation } from 'model/geometry/Coordinates';
import { RangeValue } from 'rc-picker/lib/interface';
import React from 'react';
import { ITripCreatePayload } from 'service/business/trip/TripBusinessStore';

export interface ITripCreateModalOwnProps {
  onTripCreate: (values: ITripCreatePayload) => void;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateForm {
  label: string;
  dateRange: RangeValue<Dayjs>;
  location: ILocation;
}

type ITripCreateModalProps = ITripCreateModalOwnProps & IWithLocalizeOwnProps;

const TripCreateModal: React.FC<ITripCreateModalProps> = (props: ITripCreateModalProps) => {
  const [form] = Form.useForm<ITripCreateForm>();

  return (
    <Modal title={props.translate('TRIP_CREATE_MODAL.TITLE')} open={true} onCancel={props.onTripCreateModalClose} onOk={form.submit} className="tripCreateModal__modal">
      <TripCreateForm formRef={form} onSubmit={props.onTripCreate} />
    </Modal>
  );
};

export default withLocalize<ITripCreateModalOwnProps>(TripCreateModal as any);
