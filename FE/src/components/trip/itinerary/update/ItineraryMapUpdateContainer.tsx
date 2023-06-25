import { useCallback } from "react";
import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
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
import ItineraryCreateView from "../create/ItineraryCreateView";

export interface IItineraryMapUpdateContainerOwnProps {}

export interface IItineraryMapUpdateContainerStateProps {
  trip: ITrip;
  itinerary: IItinerary;
}
export interface IItineraryMapUpdateContainerDispatchProps {
  itinerariesUpdate: (
    itineraryUpdatePayload: IItineraryPayload
  ) => ITrackableAction;
}
type IItineraryMapUpdateContainerProps = IItineraryMapUpdateContainerOwnProps &
  IItineraryMapUpdateContainerStateProps &
  IItineraryMapUpdateContainerDispatchProps;

const ItineraryMapUpdateContainer: React.FC<
  IItineraryMapUpdateContainerProps
> = (props: IItineraryMapUpdateContainerProps) => {
  const handleItineraryUpdate = useCallback(
    (values: IItineraryForm) => {
      return props.itinerariesUpdate({ ...values, tripId: props.trip.id });
    },
    [props.trip.id]
  );

  return (
    <ItineraryCreateView trip={props.trip} onSubmit={handleItineraryUpdate} />
  );
};

const mapStateToProps = (
  state: any
): IItineraryMapUpdateContainerStateProps => ({
  itinerary: ItineraryBusinessStore.selectors.getItinerary(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryMapUpdateContainerDispatchProps => ({
  itinerariesUpdate: (itineraryUpdatePayload: IItineraryPayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itinerariesUpdate(itineraryUpdatePayload)
      )
    ),
});

export default connect<
  IItineraryMapUpdateContainerStateProps,
  IItineraryMapUpdateContainerDispatchProps,
  IItineraryMapUpdateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryMapUpdateContainer);
