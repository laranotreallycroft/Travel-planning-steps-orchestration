import { Badge, Button, Calendar, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";

export interface IItineraryViewOwnProps {
  trip: ITrip;
  itineraryList?: IItinerary[];
}

type IItineraryViewProps = IItineraryViewOwnProps;
const ItineraryView: React.FC<IItineraryViewProps> = (
  props: IItineraryViewProps
) => {
  const [selectedDate, setselectedDate] = useState<Dayjs>(
    dayjs(props.trip.dateFrom)
  );

  const [isItineraryCreateModalOpen, setIsItineraryCreateModalOpen] =
    useState<boolean>(false);

  const toggleItineraryCreateModal = useCallback(() => {
    setIsItineraryCreateModalOpen((prevState) => !prevState);
  }, []);

  const dateCellRender = (value: Dayjs) => {
    if (
      props.trip.itinerary?.some(
        (itineraryElement: IItinerary) =>
          itineraryElement.date === value.format("YYYY-MM-DD")
      )
    )
      return <Badge key={1} status={"success"} />;
  };

  return (
    <div className="fullHeight">
      <Row gutter={[16, 16]}>
        <Col span={6} className="panel">
          <Calendar
            fullscreen={false}
            cellRender={dateCellRender}
            onSelect={setselectedDate}
          />
        </Col>
        <Col span={17} className="panel">
          <Button type="primary" onClick={toggleItineraryCreateModal}>
            Create new
          </Button>
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
