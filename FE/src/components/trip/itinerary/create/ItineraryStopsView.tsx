import { ZoomInOutlined, DeleteOutlined } from '@ant-design/icons';
import { Accessible, DirectionsBike, DirectionsCar, DirectionsWalk, Hiking } from '@mui/icons-material';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import { Button, Col, Form, Radio, Row, Select, Tooltip } from 'antd';
import DragAndDropTable from 'components/common/list/DragAndDropTable';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import MapElement from 'components/common/map/MapElement';
import MapSearch from 'components/common/map/MapSearch';
import { ILocation } from 'model/geometry/Coordinates';
import { TransportationMethodEnum } from 'model/trip/itinerary/TransportationMethodEnum';
import React, { useCallback, useState } from 'react';
import { IItineraryElementPayload, IItineraryPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import notificationService from 'service/util/notificationService';

export interface IItineraryStopsViewOwnProps {
  onNextStep: () => void;
}

type IItineraryStopsViewProps = IItineraryStopsViewOwnProps & IWithLocalizeOwnProps;

const ItineraryStopsView: React.FC<IItineraryStopsViewProps> = (props: IItineraryStopsViewProps) => {
  const form = Form.useFormInstance<IItineraryPayload>();
  const stops = Form.useWatch('stops', form);
  const [selectedStop, setSelectedStop] = useState<IItineraryElementPayload | undefined>(stops?.[0]);

  const handleAddStop = useCallback(
    (value: ILocation) => {
      let payload: IItineraryElementPayload;
      if (stops) {
        payload = {
          id: `${value.id}-${stops.length}`,
          location: value,
          duration: 60,
        };
        form.setFieldValue('stops', [...stops, payload]);
      } else {
        payload = {
          id: `${value.id}-0`,
          location: value,
          duration: 60,
        };
        form.setFieldValue('stops', [payload]);
      }
      setSelectedStop(payload);
    },
    [stops]
  );

  const handleRemoveStop = useCallback(
    (e: any, value: IItineraryElementPayload) => {
      e.stopPropagation();
      e.preventDefault();
      const newLocations = stops.filter((stop) => stop.id !== value.id);
      setSelectedStop(newLocations[0]);
      form.setFieldValue('stops', newLocations);
    },
    [stops]
  );

  const handleNext = useCallback(() => {
    if (stops == null) {
      notificationService.error(props.translate('ITINERARY_STOPS_VIEW.NOTIFICATION_ERROR.ZERO_STOPS.TITLE'), props.translate('ITINERARY_STOPS_VIEW.NOTIFICATION_ERROR.ZERO_STOPS.DESCRIPTION'));
    } else props.onNextStep();
  }, [stops?.length, props.onNextStep]);

  const transportationMethods = [
    {
      label: (
        <Row gutter={8}>
          <Col>
            <DirectionsCar />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.CAR}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.CAR,
    },
    {
      label: (
        <Row gutter={8}>
          <Col>
            <DirectionsBike />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.BICYCLE}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.BICYCLE,
    },
    {
      label: (
        <Row gutter={8}>
          <Col>
            <SportsMotorsportsIcon />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.MOUNTAIN_BICYCLE}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.MOUNTAIN_BICYCLE,
    },
    {
      label: (
        <Row gutter={8}>
          <Col>
            <DirectionsWalk />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.WALKING}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.WALKING,
    },
    {
      label: (
        <Row gutter={8}>
          <Col>
            <Hiking />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.HIKING}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.HIKING,
    },
    {
      label: (
        <Row gutter={8}>
          <Col>
            <Accessible />
          </Col>
          <Col>{props.translate(`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.WHEELCHAIR}`)}</Col>
        </Row>
      ),
      value: TransportationMethodEnum.WHEELCHAIR,
    },
  ];

  return (
    <div className="margin-top-lg">
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <MapSearch onChange={handleAddStop} />
        </Col>

        <Col xs={24} sm={16} lg={12} xl={8}>
          <Form.Item name={'optimize'}>
            <Radio.Group>
              <Radio.Button value={false}>{props.translate('ITINERARY_STOPS_VIEW.ROUTE_OPTIMIZE.FALSE')}</Radio.Button>
              <Radio.Button value={true}>{props.translate('ITINERARY_STOPS_VIEW.ROUTE_OPTIMIZE.TRUE')}</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xs={24} sm={8} lg={12} xl={4}>
          <Form.Item name={'transportationMethod'}>
            <Select options={transportationMethods} />
          </Form.Item>
        </Col>

        <Col xs={24} xl={12}>
          <Form.List name="stops">
            {() => (
              <DragAndDropTable
                sortableContextItems={stops?.map((stop) => stop.id) ?? []}
                tableDataSource={
                  stops?.map((stop) => {
                    return { ...stop, key: stop.id };
                  }) ?? []
                }
                tableColumns={[
                  {
                    title: props.translate('ITINERARY_STOPS_VIEW.TABLE.DESTINATION'),
                    render: (value: IItineraryElementPayload) => value.location.label,
                  },
                  {
                    key: 'action',
                    width: 100,
                    render: (stop: IItineraryElementPayload) => (
                      <Row justify={'space-between'}>
                        <Tooltip placement="bottom" title={props.translate('ITINERARY_STOPS_VIEW.TABLE.REMOVE_STOP')}>
                          <Button icon={<DeleteOutlined />} onClick={(e) => handleRemoveStop(e, stop)} size="small" />
                        </Tooltip>
                        <Tooltip placement="bottom" title={props.translate('ITINERARY_STOPS_VIEW.TABLE.ZOOM')}>
                          <Button icon={<ZoomInOutlined />} onClick={() => setSelectedStop(stop)} size="small" />
                        </Tooltip>
                      </Row>
                    ),
                  },
                ]}
                setStops={(stops) => form.setFieldValue('stops', stops)}
              />
            )}
          </Form.List>
        </Col>
        <Col xs={24} xl={12}>
          <MapElement className="itineraryStopsView__map" selectedLocation={selectedStop?.location} locationList={[stops?.map((stop) => stop.location)]} />
        </Col>
      </Row>

      <Row justify={'end'} align={'bottom'} className="margin-top-md">
        <Button type="primary" onClick={handleNext}>
          {props.translate('ITINERARY_STOPS_VIEW.NEXT_STEP')}
        </Button>
      </Row>
    </div>
  );
};

export default withLocalize<IItineraryStopsViewOwnProps>(ItineraryStopsView as any);
