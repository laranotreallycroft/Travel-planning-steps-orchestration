import { Badge, Button, Calendar, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";
import MapElement from "../../common/map/MapElement";
import Schedule from "./schedule/Schedule";

export interface IItineraryViewOwnProps {
  trip: ITrip;
  itineraryList?: IItinerary[];
  itinerary?: IItinerary;
  onItinerarySelect: (itinerary?: IItinerary) => void;
}

type IItineraryViewProps = IItineraryViewOwnProps;
const ItineraryView: React.FC<IItineraryViewProps> = (
  props: IItineraryViewProps
) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayjs(props.trip.dateFrom)
  );
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const toggleScheduleVisible = useCallback(() => {
    setScheduleVisible((prevState) => !prevState);
  }, []);
  const toggleIsEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);
  const handleSelectDate = useCallback(
    (date: Dayjs) => {
      setSelectedDate(date);
      const selectedItinerary = props.itineraryList?.find(
        (itineraryElement: IItinerary) =>
          itineraryElement.date === date.format("YYYY-MM-DD")
      );
      props.onItinerarySelect(selectedItinerary);
    },
    [props.itineraryList]
  );

  const [isItineraryCreateModalOpen, setIsItineraryCreateModalOpen] =
    useState<boolean>(false);

  const toggleItineraryCreateModal = useCallback(() => {
    setIsItineraryCreateModalOpen((prevState) => !prevState);
  }, []);

  const cellRender = useCallback(
    (value: Dayjs) => {
      const visible = props.itineraryList?.some(
        (itineraryElement: IItinerary) =>
          itineraryElement.date === value.format("YYYY-MM-DD")
      );

      return (
        <Badge key={1} status={"success"} className={visible ? "" : "hidden"} />
      );
    },
    [props.itineraryList]
  );

  return (
    <div className="fullHeight">
      <Row justify={"end"}>
        <Button onClick={toggleScheduleVisible}> changeView</Button>
        <Button onClick={toggleIsEditing}> Edit route</Button>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6} className="panel fullHeight">
          <Calendar
            fullscreen={false}
            cellRender={cellRender}
            onSelect={handleSelectDate}
            value={selectedDate}
          />
        </Col>

        <Col span={17} className="panel noPadding">
          {props.itinerary ? (
            scheduleVisible ? (
              <Schedule itinerary={props.itinerary} isEditing={isEditing} />
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
                className="fullHeight"
              />
            )
          ) : (
            <Button type="primary" onClick={toggleItineraryCreateModal}>
              Create new
            </Button>
          )}
        </Col>
      </Row>
      <ItineraryCreateContainer
        onItineraryCreateModalClose={toggleItineraryCreateModal}
        isItineraryCreateModalOpen={isItineraryCreateModalOpen}
        date={selectedDate.format("YYYY-MM-DD")}
      />
    </div>
  );
};

export default ItineraryView;
