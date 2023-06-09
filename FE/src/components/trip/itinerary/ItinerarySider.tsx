import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import MapElement from "../../common/map/MapElement";
import Schedule from "./schedule/Schedule";
import ItineraryMapUpdateContainer from "./update/ItineraryMapUpdateContainer";
export interface IItineraryViewOwnProps {
  itinerary: IItinerary;
}

type IItineraryViewProps = IItineraryViewOwnProps;
const ItinerarySider: React.FC<IItineraryViewProps> = (
  props: IItineraryViewProps
) => {
  const [scheduleView, setScheduleView] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(true);

  useEffect(() => {
    setScheduleView(false);
    setIsEditing(false);
  }, [props.itinerary]);

  const toggleScheduleView = useCallback(() => {
    setScheduleView((prevState) => !prevState);
  }, []);
  const toggleIsScheduleEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  return (
    <Col span={18}>
      <Row className="itinerarySider__siderButtonsContainer">
        <Button
          className="margin-sm itinerarySider__siderButtons"
          onClick={toggleScheduleView}
          icon={scheduleView ? <LocationOnIcon /> : <CalendarTodayIcon />}
        />
        <Button
          className="margin-sm itinerarySider__siderButtons"
          onClick={toggleIsScheduleEditing}
          icon={scheduleView ? <EditCalendarIcon /> : <AddLocationAltIcon />}
        />
      </Row>
      <Row className="itinerarySider__sider">
        {scheduleView ? (
          <Schedule itinerary={props.itinerary} isEditing={isEditing} />
        ) : isEditing ? (
          <ItineraryMapUpdateContainer />
        ) : (
          <MapElement
            selectedLocation={{
              ...props.itinerary.itineraryElements[0],
              ...props.itinerary.itineraryElements[0].location,
            }}
            locations={props.itinerary.itineraryElements.map((element) => {
              return {
                ...element,
                ...element.location,
              };
            })}
            paths={props.itinerary.routeGeometry.map((coordinates) => [
              coordinates.x,
              coordinates.y,
            ])}
            className="fullHeight panel"
          />
        )}
      </Row>
    </Col>
  );
};

export default ItinerarySider;
