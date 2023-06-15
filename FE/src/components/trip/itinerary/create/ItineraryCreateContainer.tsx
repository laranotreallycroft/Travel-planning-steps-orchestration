import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import {
  IItineraryForm,
  IItineraryPayload,
  ItineraryBusinessStore,
} from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../../service/util/trackAction";
import ItineraryCreateView from "./ItineraryCreateView";

export interface IItineraryCreateContainerOwnProps {}

export interface IItineraryCreateContainerStateProps {
  trip: ITrip;
}
export interface IItineraryCreateContainerDispatchProps {
  itinerariesCreate: (
    itineraryRoutePayload: IItineraryPayload
  ) => ITrackableAction;
}
type IItineraryCreateContainerProps = IItineraryCreateContainerOwnProps &
  IItineraryCreateContainerStateProps &
  IItineraryCreateContainerDispatchProps;

const ItineraryCreateContainer: React.FC<IItineraryCreateContainerProps> = (
  props: IItineraryCreateContainerProps
) => {
  const handleItinerariesCreate = (values: IItineraryForm) => {
    props.itinerariesCreate({ ...values, tripId: props.trip.id });
  };

  return (
    <ItineraryCreateView trip={props.trip} onSubmit={handleItinerariesCreate} />
  );
};

const mapStateToProps = (state: any): IItineraryCreateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryCreateContainerDispatchProps => ({
  itinerariesCreate: (itineraryCreatePayload: IItineraryPayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itinerariesCreate(itineraryCreatePayload)
      )
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
