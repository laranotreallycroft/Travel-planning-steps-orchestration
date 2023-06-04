import { connect } from "react-redux";
import { ITrip } from "../../../../model/trip/Trip";
import {
  IShortestRoute,
  IShortestRouteOpenrouteservicePayload,
} from "../../../../model/trip/sightseeing/Sightseeing";
import { SightseeingBusinessStore } from "../../../../service/business/sightseeing/SightseeingBusinessStore";
import { TripBusinessStore } from "../../../../service/business/trip/TripBusinessStore";
import { IGeosearchPayload } from "../../../common/map/MapElement";
import SightseeingStopsView from "./SightseeingStopsView";

export interface ISightseeingStopsContainerOwnProps {
  onNextStep: () => void;
}

export interface ISightseeingStopsContainerStateProps {
  trip: ITrip;
  shortestRouteOpenrouteservice: IShortestRoute;
}
export interface ISightseeingStopsContainerDispatchProps {
  shortestRouteOpenrouteserviceFetch: (
    shortestRoutePayload: IShortestRouteOpenrouteservicePayload
  ) => void;
}
type ISightseeingStopsContainerProps = ISightseeingStopsContainerOwnProps &
  ISightseeingStopsContainerStateProps &
  ISightseeingStopsContainerDispatchProps;

const SightseeingStopsContainer: React.FC<ISightseeingStopsContainerProps> = (
  props: ISightseeingStopsContainerProps
) => {
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
    <SightseeingStopsView
      originLocation={{ ...props.trip.location, label: props.trip.name }}
      onSightseeingStopsSelect={handleSightseeingStopsSelect}
    />
  );
};

const mapStateToProps = (state: any): ISightseeingStopsContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
  shortestRouteOpenrouteservice:
    SightseeingBusinessStore.selectors.getShortestRouteOpenrouteservice(state),
});

const mapDispatchToProps = (
  dispatch: any
): ISightseeingStopsContainerDispatchProps => ({
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
  ISightseeingStopsContainerStateProps,
  ISightseeingStopsContainerDispatchProps,
  ISightseeingStopsContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(SightseeingStopsContainer);
