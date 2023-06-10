import { Badge, Calendar, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import ItinerarySider from "./ItinerarySider";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";
export interface IItineraryViewOwnProps {
  trip: ITrip;
  itineraryList?: IItinerary[];
  itinerary?: IItinerary;
  onItinerarySelect: (itinerary?: IItinerary) => void;
  onItineraryDelete: () => void;
}

type IItineraryViewProps = IItineraryViewOwnProps;
const ItineraryView: React.FC<IItineraryViewProps> = (
  props: IItineraryViewProps
) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayjs(props.trip.dateFrom)
  );

  useEffect(() => {
    handleSelectDate(dayjs(props.trip.dateFrom));
  }, [props.trip.id]);

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
      <Row gutter={[16, 16]} className="fullHeight">
        <Col span={6}>
          <Calendar
            fullscreen={false}
            cellRender={cellRender}
            onSelect={handleSelectDate}
            value={selectedDate}
            className="panel"
          />
        </Col>

        {props.itinerary ? (
          <ItinerarySider
            itinerary={props.itinerary}
            onItineraryDelete={props.onItineraryDelete}
          />
        ) : (
          <Col span={18}>
            <ItineraryCreateContainer date={selectedDate} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ItineraryView;
