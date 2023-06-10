import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Col, Radio, Row } from "antd";
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
    setIsEditing(false);
  }, [props.itinerary]);

  const toggleIsScheduleEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  return (
    <Col span={18}>
      <Row className="itinerarySider__siderButtonsContainer">
        <Radio.Group
          value={scheduleView}
          onChange={(e) => setScheduleView(e.target.value)}
        >
          <Radio.Button value={false}>
            <LocationOnIcon />
          </Radio.Button>
          <Radio.Button value={true}>
            <CalendarTodayIcon />
          </Radio.Button>
        </Radio.Group>

        <Button
          onClick={toggleIsScheduleEditing}
          icon={isEditing ? <CloseIcon /> : <EditIcon />}
          className="margin-left-sm margin-right-l"
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
