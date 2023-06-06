import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import ItineraryCreateView from "./ItineraryCreateView";
import {
  IItineraryRouteCreatePayload,
  ItineraryBusinessStore,
} from "../../../../service/business/itinerary/ItineraryBusinessStore";

export interface IItineraryCreateContainerOwnProps {
  date: string;
  isItineraryCreateModalOpen: boolean;
  onItineraryCreateModalClose: () => void;
}

export interface IItineraryCreateContainerStateProps {
  trip: ITrip;
}
export interface IItineraryCreateContainerDispatchProps {
  itineraryRouteCreate: (
    itineraryRoutePayload: IItineraryRouteCreatePayload
  ) => void;
}
type IItineraryCreateContainerProps = IItineraryCreateContainerOwnProps &
  IItineraryCreateContainerStateProps &
  IItineraryCreateContainerDispatchProps;

const ItineraryCreateContainer: React.FC<IItineraryCreateContainerProps> = (
  props: IItineraryCreateContainerProps
) => {
  return (
    <ItineraryCreateView
      trip={props.trip}
      onItineraryCreateModalClose={props.onItineraryCreateModalClose}
      isItineraryCreateModalOpen={props.isItineraryCreateModalOpen}
      onItineraryCreate={props.itineraryRouteCreate}
    />
  );
};

const mapStateToProps = (state: any): IItineraryCreateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryCreateContainerDispatchProps => ({
  itineraryRouteCreate: (itineraryRoutePayload: IItineraryRouteCreatePayload) =>
    dispatch(
      ItineraryBusinessStore.actions.itineraryRouteCreate(itineraryRoutePayload)
    ),
});

export default connect<
  IItineraryCreateContainerStateProps,
  IItineraryCreateContainerDispatchProps,
  IItineraryCreateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryCreateContainer);
