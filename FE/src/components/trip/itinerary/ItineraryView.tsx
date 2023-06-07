import { Badge, Button, Calendar, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";

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
      if (
        props.itineraryList?.some(
          (itineraryElement: IItinerary) =>
            itineraryElement.date === value.format("YYYY-MM-DD")
        )
      )
        return <Badge key={1} status={"success"} />;
    },
    [props.itineraryList]
  );

  return (
    <div className="fullHeight">
      <Row gutter={[16, 16]}>
        <Col span={6} className="panel">
          <Calendar
            fullscreen={false}
            cellRender={cellRender}
            onSelect={handleSelectDate}
          />
        </Col>
        <Col span={17} className="panel">
          {props.itinerary ? (
            <div>aaa</div>
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
