import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import {
  IItineraryPayload,
  ItineraryBusinessStore,
} from "../../../../service/business/itinerary/ItineraryBusinessStore";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import ItineraryCreateView, {
  IItineraryCreateForm,
} from "./ItineraryCreateView";

export interface IItineraryCreateContainerOwnProps {
  date: string;
  isItineraryCreateModalOpen: boolean;
  onItineraryCreateModalClose: () => void;
}

export interface IItineraryCreateContainerStateProps {
  trip: ITrip;
}
export interface IItineraryCreateContainerDispatchProps {
  itineraryRouteCreate: (itineraryRoutePayload: IItineraryPayload) => void;
}
type IItineraryCreateContainerProps = IItineraryCreateContainerOwnProps &
  IItineraryCreateContainerStateProps &
  IItineraryCreateContainerDispatchProps;

const ItineraryCreateContainer: React.FC<IItineraryCreateContainerProps> = (
  props: IItineraryCreateContainerProps
) => {
  const handleItineraryCreate = (values: IItineraryCreateForm) => {
    props.itineraryRouteCreate({ ...values, date: props.date });
  };
  return (
    <ItineraryCreateView
      trip={props.trip}
      onItineraryCreateModalClose={props.onItineraryCreateModalClose}
      isItineraryCreateModalOpen={props.isItineraryCreateModalOpen}
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
  itineraryRouteCreate: (itineraryRoutePayload: IItineraryPayload) =>
    dispatch(
      ItineraryBusinessStore.actions.itineraryCreate(itineraryRoutePayload)
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
