import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { IItinerary } from "../../../model/trip/itinerary/Itinerary";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { ItineraryBusinessStore } from "../../../service/business/trip/itinerary/ItineraryBusinessStore";
import ItineraryView from "./ItineraryView";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";

export interface IItineraryContainerOwnProps {}

export interface IItineraryContainerStateProps {
  trip: ITrip;
  itinerary: IItinerary;
}
export interface IItineraryContainerDispatchProps {
  itineraryStore: (itineraryRoutePayload: IItinerary) => void;
  itineraryClear: () => void;
  itinerariesDelete: () => void;
}
type IItineraryContainerProps = IItineraryContainerOwnProps &
  IItineraryContainerStateProps &
  IItineraryContainerDispatchProps;

const ItineraryContainer: React.FC<IItineraryContainerProps> = (
  props: IItineraryContainerProps
) => {
  return props.trip.itineraries.length > 0 ? (
    <ItineraryView
      trip={props.trip}
      onItinerariesDelete={props.itinerariesDelete}
    />
  ) : (
    <ItineraryCreateContainer />
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
  itinerariesDelete: () =>
    dispatch(ItineraryBusinessStore.actions.itinerariesDelete()),
});

export default connect<
  IItineraryContainerStateProps,
  IItineraryContainerDispatchProps,
  IItineraryContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryContainer);
