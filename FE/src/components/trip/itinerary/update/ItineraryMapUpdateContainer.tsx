import { useCallback } from "react";
import { connect } from "react-redux";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import {
  IItineraryPayload,
  ItineraryBusinessStore,
} from "../../../../service/business/itinerary/ItineraryBusinessStore";
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
  itineraryUpdate: (
    itineraryRoutePayload: IItineraryPayload
  ) => ITrackableAction;
}
type IItineraryMapUpdateContainerProps = IItineraryMapUpdateContainerOwnProps &
  IItineraryMapUpdateContainerStateProps &
  IItineraryMapUpdateContainerDispatchProps;

const ItineraryMapUpdateContainer: React.FC<
  IItineraryMapUpdateContainerProps
> = (props: IItineraryMapUpdateContainerProps) => {
  const handleItineraryUpdate = useCallback((values: IItineraryRoutingForm) => {
    //TODO
    return props.itineraryUpdate({ ...values, date: "" });
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
  itineraryUpdate: (itineraryRoutePayload: IItineraryPayload) =>
    dispatch(
      createTrackableAction(
        ItineraryBusinessStore.actions.itineraryUpdate(itineraryRoutePayload)
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
