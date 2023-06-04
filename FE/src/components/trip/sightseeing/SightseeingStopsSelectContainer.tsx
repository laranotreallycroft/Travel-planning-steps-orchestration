import { connect } from "react-redux";
import { ITrip } from "../../../model/trip/Trip";
import {
  IShortestRoute,
  IShortestRouteOpenrouteservicePayload,
} from "../../../model/trip/sightseeing/Sightseeing";
import { SightseeingBusinessStore } from "../../../service/business/sightseeing/SightseeingBusinessStore";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { IGeosearchPayload } from "../../common/map/MapElement";
import SightseeingStopsSelectView from "./SightseeingStopsSelectView";

export interface ISightseeingStopsSelectContainerOwnProps {
  onNextStep: () => void;
}

export interface ISightseeingStopsSelectContainerStateProps {
  trip: ITrip;
  shortestRouteOpenrouteservice: IShortestRoute;
}
export interface ISightseeingStopsSelectContainerDispatchProps {
  shortestRouteOpenrouteserviceFetch: (
    shortestRoutePayload: IShortestRouteOpenrouteservicePayload
  ) => void;
}
type ISightseeingStopsSelectContainerProps =
  ISightseeingStopsSelectContainerOwnProps &
    ISightseeingStopsSelectContainerStateProps &
    ISightseeingStopsSelectContainerDispatchProps;

const SightseeingStopsSelectContainer: React.FC<
  ISightseeingStopsSelectContainerProps
> = (props: ISightseeingStopsSelectContainerProps) => {
  const handleSightseeingStopsSelect = (values: IGeosearchPayload[]) => {
    const payload: IShortestRouteOpenrouteservicePayload = {
      jobs: values.map((value, index) => {
        return { id: index, location: [value.x, value.y], skills: [1] };
      }),
      vehicles: [
        {
          id: 1,
          profile: "driving-car",
          start: [values[0].x, values[0].y],
          end: [values[0].x, values[0].y],
          capacity: [4],
          skills: [1, 14],
        },
      ],
    };
    props.shortestRouteOpenrouteserviceFetch(payload);
    //   props.onNextStep();
  };
  return (
    <SightseeingStopsSelectView
      originLocation={{ ...props.trip.location, label: props.trip.name }}
      onSightseeingStopsSelect={handleSightseeingStopsSelect}
    />
  );
};

const mapStateToProps = (
  state: any
): ISightseeingStopsSelectContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
  shortestRouteOpenrouteservice:
    SightseeingBusinessStore.selectors.getShortestRouteOpenrouteservice(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingStopsSelectContainerDispatchProps => ({
  shortestRouteOpenrouteserviceFetch: (
    shortestRoutePayload: IShortestRouteOpenrouteservicePayload
  ) =>
    dispatch(
      SightseeingBusinessStore.actions.shortestRouteOpenrouteserviceFetch(
        shortestRoutePayload
      )
    ),
});

export default connect<
  ISightseeingStopsSelectContainerStateProps,
  ISightseeingStopsSelectContainerDispatchProps,
  ISightseeingStopsSelectContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingStopsSelectContainer);
