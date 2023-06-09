import { useCallback } from "react";
import { connect } from "react-redux";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import {
  IItineraryUpdatePayload,
  ItineraryBusinessStore,
} from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import {
  ITrackableAction,
  createTrackableAction,
} from "../../../../service/util/trackAction";
import { IItineraryRoutingForm } from "../create/ItineraryCreateView";
import ItineraryMapUpdateView from "./ItineraryMapUpdateView";

export interface IItineraryMapUpdateContainerOwnProps {}

export interface IItineraryMapUpdateContainerStateProps {
  itinerary: IItinerary;
}
export interface IItineraryMapUpdateContainerDispatchProps {
  itineraryMapUpdate: (
    itineraryRoutePayload: IItineraryUpdatePayload
  ) => ITrackableAction;
}
type IItineraryMapUpdateContainerProps = IItineraryMapUpdateContainerOwnProps &
  IItineraryMapUpdateContainerStateProps &
  IItineraryMapUpdateContainerDispatchProps;

const ItineraryMapUpdateContainer: React.FC<
  IItineraryMapUpdateContainerProps
> = (props: IItineraryMapUpdateContainerProps) => {
  const handleItineraryUpdate = useCallback((values: IItineraryRoutingForm) => {
    return props.itineraryMapUpdate({ ...values, id: props.itinerary.id });
  }, []);

  return (
    <ItineraryMapUpdateView
      itinerary={props.itinerary}
      onItineraryUpdate={handleItineraryUpdate}
    />
  );
};

const mapStateToProps = (
  state: any
): IItineraryMapUpdateContainerStateProps => ({
  itinerary: ItineraryBusinessStore.selectors.getItinerary(state),
});

const mapDispatchToProps = (
  dispatch: any
): IItineraryMapUpdateContainerDispatchProps => ({
  itineraryMapUpdate: (itineraryRoutePayload: IItineraryUpdatePayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itineraryMapUpdate(itineraryRoutePayload)
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
