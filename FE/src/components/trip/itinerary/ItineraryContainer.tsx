import { useCallback } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import { ItineraryBusinessStore } from "../../../service/business/trip/itinerary/ItineraryBusinessStore";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import ItineraryView from "./ItineraryView";

export interface IItineraryContainerOwnProps {}

export interface IItineraryContainerStateProps {
  trip: ITrip;
  itinerary: IItinerary;
}
export interface IItineraryContainerDispatchProps {
  itineraryStore: (itineraryRoutePayload: IItinerary) => void;
  itineraryClear: () => void;
  itineraryDelete: () => void;
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
      onItineraryDelete={props.itineraryDelete}
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
  itineraryDelete: () =>
    dispatch(ItineraryBusinessStore.actions.itineraryDelete()),
});

export default connect<
  IItineraryContainerStateProps,
  IItineraryContainerDispatchProps,
  IItineraryContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryContainer);
