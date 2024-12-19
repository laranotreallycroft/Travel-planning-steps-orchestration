import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Popconfirm, Radio, Row } from 'antd';
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

type IItineraryViewProps = IItineraryViewOwnProps;
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
      <Row className="itineraryView__header">
        <Radio.Group value={scheduleView} onChange={(e) => setScheduleView(e.target.value)}>
          <Radio.Button value={false}>
            <LocationOnIcon />
          </Radio.Button>
          <Radio.Button value={true}>
            <CalendarTodayIcon />
          </Radio.Button>
        </Radio.Group>

        <Button onClick={toggleIsEditing} icon={isEditing ? <CloseIcon /> : <EditIcon />} className="margin-left-sm" />

        {isEditing && (
          <Popconfirm title="Delete itinerary" description="Are you sure to delete this itinerary?" onConfirm={props.onItinerariesDelete} okText="Yes" cancelText="No" placement="topRight" className="margin-left-xl">
            <Button icon={<DeleteIcon />} />
          </Popconfirm>
        )}
      </Row>
      <React.Fragment>
        {scheduleView ? (
          <Schedule itineraries={props.trip.itineraries!} isEditing={isEditing} />
        ) : isEditing ? (
          <ItineraryMapUpdateContainer />
        ) : (
          <React.Fragment>
            <MapElement
              selectedLocation={{ ...props.trip, ...props.trip.location }}
              locationList={props.trip.itineraries?.map((itineraryElement) =>
                itineraryElement.itineraryElements.map((element) => {
                  return element.location;
                })
              )}
              pathList={pathList}
              className="fullHeight"
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ItineraryView;
