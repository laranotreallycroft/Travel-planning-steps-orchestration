import { useCallback } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import {
  IItineraryPayload,
  ItineraryBusinessStore,
} from "../../../../service/business/itinerary/ItineraryBusinessStore";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../../service/util/trackAction";
import ItineraryCreateView, {
  IItineraryRoutingForm,
} from "./ItineraryCreateView";

export interface IItineraryCreateContainerOwnProps {
  date: string;
}

export interface IItineraryCreateContainerStateProps {
  trip: ITrip;
}
export interface IItineraryCreateContainerDispatchProps {
  itineraryCreate: (
    itineraryRoutePayload: IItineraryPayload
  ) => ITrackableAction;
}
type IItineraryCreateContainerProps = IItineraryCreateContainerOwnProps &
  IItineraryCreateContainerStateProps &
  IItineraryCreateContainerDispatchProps;

const ItineraryCreateContainer: React.FC<IItineraryCreateContainerProps> = (
  props: IItineraryCreateContainerProps
) => {
  const handleItineraryCreate = useCallback((values: IItineraryRoutingForm) => {
    return props.itineraryCreate({ ...values, date: props.date });
  }, []);

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
  itineraryCreate: (itineraryRoutePayload: IItineraryPayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itineraryCreate(itineraryRoutePayload)
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
