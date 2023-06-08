import { Badge } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
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
      {props.itinerary && <Schedule itinerary={props.itinerary} />}
    </div>
  );
};

export default ItineraryView;
