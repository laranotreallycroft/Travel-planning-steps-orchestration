import { Button, Col, Form, InputNumber, Row, Table } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import StartCheckbox from 'components/trip/itinerary/create/StartCheckbox';
import React from 'react';
import { IItineraryElementPayload, IItineraryPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';

export interface IItineraryDurationViewOwnProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
}

type IItineraryDurationViewProps = IItineraryDurationViewOwnProps & IWithLocalizeOwnProps;

const ItineraryDurationView: React.FC<IItineraryDurationViewProps> = (props: IItineraryDurationViewProps) => {
  const form = Form.useFormInstance<IItineraryPayload>();

  const handleDurationChange = (value: number, stopId: string) => {
    const stops = form.getFieldsValue(true).stops;
    const newStops = stops.map((stop: IItineraryElementPayload) => {
      if (stop.id === stopId) stop.duration = value;
      return stop;
    });
    form.setFieldValue('stops', newStops);
  };

  const handleStartChange = (value: boolean, stopId: string) => {
    const stops = form.getFieldsValue(true).stops;
    const newStops = stops.map((stop: IItineraryElementPayload) => {
      if (stop.id === stopId) stop.start = value;
      return stop;
    });
    form.setFieldValue('stops', newStops);
  };

  return (
    <div className="margin-top-lg">
      <Row className="itineraryDurationView__tableContainer">
        <Table
          className="fullWidth"
          dataSource={form.getFieldValue('stops').map((stop: IItineraryElementPayload) => {
            return { ...stop, key: stop.id };
          })}
          columns={[
            {
              title: props.translate('ITINERARY_DURATION_VIEW.TABLE.DESTINATION'),
              key: 'label',
              render: (stop: IItineraryElementPayload) => stop.location.label,
            },
            {
              title: props.translate('ITINERARY_DURATION_VIEW.TABLE.DURATION'),
              key: 'duration',
              render: (stop: IItineraryElementPayload) => (
                <Row gutter={16} justify={'center'}>
                  <InputNumber defaultValue={stop.duration} min={1} max={600} onChange={(value) => handleDurationChange(value ?? 1, stop.id)} />
                  <Col>{props.translate('ITINERARY_DURATION_VIEW.TABLE.DURATION.MINUTES')}</Col>
                </Row>
              ),
              width: 180,
            },

            {
              title: props.translate('ITINERARY_DURATION_VIEW.TABLE.START'),
              key: 'start',
              render: (stop: IItineraryElementPayload) => (
                <Row gutter={16} justify={'center'}>
                  <StartCheckbox onChange={(value) => handleStartChange(value, stop.id)} value={stop.start} />
                </Row>
              ),
              width: 180,
            },
          ]}
          pagination={false}
        />
      </Row>
      <Row justify={'space-between'} align={'bottom'} className="margin-top-md">
        <Button type="primary" onClick={props.onPreviousStep}>
          {props.translate('ITINERARY_STOPS_VIEW.PREVIOUS_STEP')}
        </Button>
        <Button type="primary" onClick={props.onNextStep}>
          {props.translate('COMMON.FORM.SUBMIT')}
        </Button>
      </Row>
    </div>
  );
};

export default withLocalize<IItineraryDurationViewOwnProps>(ItineraryDurationView as any);
