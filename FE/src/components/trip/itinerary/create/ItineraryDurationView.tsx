import { Button, Col, Form, InputNumber, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { IGeosearchPayloadWithId } from 'model/geometry/Coordinates';
import React from 'react';
import { IItineraryForm, IItineraryElementPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';
export interface IItineraryDurationViewOwnProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
}

type IItineraryDurationViewProps = IItineraryDurationViewOwnProps;

const ItineraryDurationView: React.FC<IItineraryDurationViewProps> = (props: IItineraryDurationViewProps) => {
  const form = Form.useFormInstance<IItineraryForm>();

  const handleDurationChange = (value: number, locationId: string) => {
    const locations = form.getFieldsValue(true).locations;
    const newLocations = locations.map((location: IItineraryElementPayload) => {
      if (location.id === locationId) location.duration = value;
      return location;
    });
    form.setFieldValue('locations', newLocations);
  };
  return (
    <React.Fragment>
      <Row>
        <Title level={4}>Decide your visit duration</Title>
      </Row>
      <Row className="itineraryDurationView__tableContainer">
        <Table
          className="fullWidth"
          bordered
          dataSource={form.getFieldValue('locations').map((location: IGeosearchPayloadWithId) => {
            return { ...location, key: location.id };
          })}
          columns={[
            {
              title: 'Location',
              dataIndex: 'label',
              key: 'label',
            },
            {
              title: 'Duration',
              dataIndex: '',
              key: 'duration',
              render: (_, location) => (
                <Row gutter={16} justify={'center'}>
                  <InputNumber defaultValue={location.duration} min={1} max={600} onChange={(value) => handleDurationChange(value ?? 1, location.id)} className="itineraryDurationView__input" />
                  <Col>minutes</Col>
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
          Back
        </Button>
        <Button type="primary" onClick={props.onNextStep}>
          Submit
        </Button>
      </Row>
    </React.Fragment>
  );
};

export default ItineraryDurationView;
