import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Col, Popconfirm, Radio, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import MapElement from 'components/common/map/MapElement';
import Schedule from 'components/trip/itinerary/schedule/Schedule';
import ItineraryMapUpdateContainer from 'components/trip/itinerary/update/ItineraryMapUpdateContainer';
import { LatLngExpression } from 'leaflet';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface IItineraryViewOwnProps {
  trip: ITrip;
  onItinerariesDelete: () => void;
}

type IItineraryViewProps = IItineraryViewOwnProps & IWithLocalizeOwnProps;
const ItineraryView: React.FC<IItineraryViewProps> = (props: IItineraryViewProps) => {
  const [scheduleView, setScheduleView] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  useEffect(() => {
    setIsEditing(false);
  }, [props.trip]);

  const toggleIsEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  const pathList: LatLngExpression[][] = useMemo(() => {
    const filteredItineraries = props.trip.itineraries.filter((itinerary) => itinerary.routeGeometry != null);
    const mappedItineraries: LatLngExpression[][] = filteredItineraries.map((itinerary) => itinerary.routeGeometry!.map((coordinates) => [coordinates.x, coordinates.y]));
    return mappedItineraries;
  }, [props.trip.itineraries]);

  return (
    <React.Fragment>
      <Row className="margin-md" justify={'end'} gutter={[8, 8]}>
        <Col>
          <Radio.Group value={scheduleView} onChange={(e) => setScheduleView(e.target.value)}>
            <Radio.Button value={false}>
              <LocationOnIcon />
            </Radio.Button>
            <Radio.Button value={true}>
              <CalendarTodayIcon />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button onClick={toggleIsEditing} icon={isEditing ? <CloseIcon /> : <EditIcon />} className="margin-left-sm" />
        </Col>
        <Col xs={2} sm={1}>
          {isEditing && (
            <Popconfirm title={props.translate('ITINERARY_VIEW.DELETE_ITINERARY.TITLE')} description={props.translate('ITINERARY_VIEW.DELETE_ITINERARY.DESCRIPTION')} onConfirm={props.onItinerariesDelete} okText={props.translate('COMMON.YES')} cancelText={props.translate('COMMON.NO')} placement="topRight">
              <Button icon={<DeleteIcon />} />
            </Popconfirm>
          )}
        </Col>
      </Row>

      {scheduleView ? (
        <Schedule itineraries={props.trip.itineraries!} isEditing={isEditing} />
      ) : isEditing ? (
        <ItineraryMapUpdateContainer />
      ) : (
        <MapElement
          selectedLocation={props.trip.location}
          locationList={props.trip.itineraries?.map((itineraryElement) =>
            itineraryElement.itineraryElements.map((element) => {
              return element.location;
            })
          )}
          pathList={pathList}
          className="fullHeight"
        />
      )}
    </React.Fragment>
  );
};

export default withLocalize<IItineraryViewOwnProps>(ItineraryView as any);
