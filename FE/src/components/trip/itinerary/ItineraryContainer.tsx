import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import ItineraryView from "./ItineraryView";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import { ItineraryBusinessStore } from "../../../service/business/itinerary/ItineraryBusinessStore";
import { useCallback } from "react";

export interface IItineraryContainerOwnProps {}

export interface IItineraryContainerStateProps {
  trip: ITrip;
  itinerary: IItinerary;
}
export interface IItineraryContainerDispatchProps {
  itineraryStore: (itineraryRoutePayload: IItinerary) => void;
  itineraryClear: () => void;
}
type IItineraryContainerProps = IItineraryContainerOwnProps &
  IItineraryContainerStateProps &
  IItineraryContainerDispatchProps;

const ItineraryContainer: React.FC<IItineraryContainerProps> = (
  props: IItineraryContainerProps
) => {
  const handleItinerarySelect = useCallback((itinerary?: IItinerary) => {
    itinerary ? props.itineraryStore(itinerary) : props.itineraryClear();
  }, []);
  return (
    <ItineraryView
      trip={props.trip}
      itineraryList={props.trip.itineraries}
      itinerary={props.itinerary}
      onItinerarySelect={handleItinerarySelect}
    />
  );
};

const mapStateToProps = (state: any): IItineraryContainerStateProps => ({
  itinerary: ItineraryBusinessStore.selectors.getItinerary(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryContainerDispatchProps => ({
  itineraryStore: (itineraryPayload: IItinerary) =>
    dispatch(ItineraryBusinessStore.actions.itineraryStore(itineraryPayload)),
  itineraryClear: () =>
    dispatch(ItineraryBusinessStore.actions.itineraryClear()),
});

export default connect<
  IItineraryContainerStateProps,
  IItineraryContainerDispatchProps,
  IItineraryContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryContainer);
