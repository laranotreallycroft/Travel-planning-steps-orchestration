import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import {
  IItineraryCreatePayload,
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
  itineraryCreate: (
    itineraryRoutePayload: IItineraryCreatePayload
  ) => ITrackableAction;
}
type IItineraryCreateContainerProps = IItineraryCreateContainerOwnProps &
  IItineraryCreateContainerStateProps &
  IItineraryCreateContainerDispatchProps;

const ItineraryCreateContainer: React.FC<IItineraryCreateContainerProps> = (
  props: IItineraryCreateContainerProps
) => {
  const handleItineraryCreate = (values: IItineraryCreatePayload) => {
    props.itineraryCreate(values);
  };

  return (
    <ItineraryCreateView
      trip={props.trip}
      onItineraryCreate={handleItineraryCreate}
    />
  );
};

const mapStateToProps = (state: any): IItineraryCreateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryCreateContainerDispatchProps => ({
  itineraryCreate: (itineraryCreatePayload: IItineraryCreatePayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itineraryCreate(itineraryCreatePayload)
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
