import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import ItineraryView from "./ItineraryView";

export interface IItineraryContainerOwnProps {}

export interface IItineraryContainerStateProps {
  trip: ITrip;
}
export interface IItineraryContainerDispatchProps {}
type IItineraryContainerProps = IItineraryContainerOwnProps &
  IItineraryContainerStateProps &
  IItineraryContainerDispatchProps;

const ItineraryContainer: React.FC<IItineraryContainerProps> = (
  props: IItineraryContainerProps
) => {
  return (
    <ItineraryView trip={props.trip} itineraryList={props.trip.itinerary} />
  );
};

const mapStateToProps = (state: any): IItineraryContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryContainerDispatchProps => ({});

export default connect<
  IItineraryContainerStateProps,
  IItineraryContainerDispatchProps,
  IItineraryContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryContainer);
