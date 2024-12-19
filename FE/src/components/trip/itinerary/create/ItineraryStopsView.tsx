import { DeleteOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Accessible, DirectionsBike, DirectionsCar, DirectionsWalk, Hiking } from '@mui/icons-material';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import { Button, Col, Form, Radio, Row, Select, Tooltip } from 'antd';
import DragAndDropTable from 'components/common/list/DragAndDropTable';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import MapElement from 'components/common/map/MapElement';
import MapSearch from 'components/common/map/MapSearch';
import { ILocation } from 'model/geometry/Coordinates';
import { TransportationMethodEnum } from 'model/trip/itinerary/TransportationMethodEnum';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IItineraryElementPayload, IItineraryPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { v4 as uuidv4 } from 'uuid';

export interface IItineraryStopsViewOwnProps {
  onNextStep: () => void;
}

type IItineraryStopsViewProps = IItineraryStopsViewOwnProps & IWithLocalizeOwnProps;

const ItineraryStopsView: React.FC<IItineraryStopsViewProps> = (props: IItineraryStopsViewProps) => {
  const form = Form.useFormInstance<IItineraryPayload>();
  const stops = Form.useWatch('stops', form);
  const [selectedStop, setSelectedStop] = useState<IItineraryElementPayload | undefined>(stops?.[0]);
  useEffect(() => {
    if (!selectedStop) {
      setSelectedStop(stops?.[0]);
    }
  }, [stops?.[0]]);

  const handleAddStop = useCallback(
    (value: ILocation) => {
      const payload: IItineraryElementPayload = {
        id: uuidv4(),
        location: value,
        duration: 60,
        start: false,
      };
      if (stops) {
        form.setFieldValue('stops', [...stops, payload]);
      } else {
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

  const isNextButtonDisabled = useMemo(() => stops?.length < 2, [stops?.length]);
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
          <MapSearch onChange={handleAddStop} hideValueAfterSelect={true} />
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
          <MapElement className="fullHeight" selectedLocation={selectedStop?.location} locationList={[stops?.map((stop) => stop.location)]} />
        </Col>
      </Row>

      <Row justify={'end'} align={'bottom'} className="margin-top-md">
        <Tooltip title={isNextButtonDisabled ? props.translate('ITINERARY_STOPS_VIEW.NEXT_STEP.DISBALED_TOOLTIP') : ''}>
          <Button disabled={isNextButtonDisabled} type="primary" onClick={props.onNextStep}>
            {props.translate('ITINERARY_STOPS_VIEW.NEXT_STEP')}
          </Button>
        </Tooltip>
      </Row>
    </div>
  );
};

export default withLocalize<IItineraryStopsViewOwnProps>(ItineraryStopsView as any);
