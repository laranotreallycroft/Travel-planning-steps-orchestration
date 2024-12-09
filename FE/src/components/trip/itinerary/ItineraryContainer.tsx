import ItineraryView from 'components/trip/itinerary/ItineraryView';
import ItineraryCreateView from 'components/trip/itinerary/create/ItineraryCreateView';
import { ITrip } from 'model/trip/Trip';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { IItineraryForm, IItineraryPayload, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { createTrackableAction, ITrackableAction } from 'service/util/trackAction';

export interface IItineraryContainerOwnProps {}

export interface IItineraryContainerStateProps {
  trip: ITrip;
}
export interface IItineraryContainerDispatchProps {
  itineraryCreate: (itineraryRoutePayload: IItineraryPayload) => ITrackableAction;
  itineraryDelete: () => void;
}

type IItineraryContainerProps = IItineraryContainerOwnProps & IItineraryContainerStateProps & IItineraryContainerDispatchProps;

const ItineraryContainer: React.FC<IItineraryContainerProps> = (props: IItineraryContainerProps) => {
  const handleItinerariesCreate = useCallback(
    (values: IItineraryForm) => {
      props.itineraryCreate({ ...values, tripId: props.trip.id });
    },
    [props.trip.id]
  );
  /*
  const mappedValues = useMemo(() => {
    return {
      locations: props.trip.itineraries.flatMap((itinerary) =>
        itinerary.itineraryElements.map((itineraryElement) => {
          return {
            id: itineraryElement.id,
            label: itineraryElement.label,
            x: itineraryElement.location.coordinates.x,
            y: itineraryElement.location.coordinates.y,
            duration: itineraryElement.duration,
          };
        })
      ),
      routeOptions: {
        optimize: false,
        transportationMethod: props.trip.itineraries[0].transportationMethod,
      },
    };
  }, [props.trip.itineraries]);*/

  return props.trip?.itineraries.length > 0 ? <ItineraryView trip={props.trip} onItinerariesDelete={props.itineraryDelete} /> : <ItineraryCreateView onSubmit={handleItinerariesCreate} initialValues={{ optimize: false, transportationMethod: 'driving-car' }} />;
};

const mapStateToProps = (state: any): IItineraryContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IItineraryContainerDispatchProps => ({
  itineraryCreate: (itineraryCreatePayload: IItineraryPayload) => dispatch(createTrackableAction(ItineraryBusinessStore.actions.itineraryCreate(itineraryCreatePayload))),

  itineraryDelete: () => dispatch(ItineraryBusinessStore.actions.itineraryDelete()),
});

export default connect<IItineraryContainerStateProps, IItineraryContainerDispatchProps, IItineraryContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ItineraryContainer);
