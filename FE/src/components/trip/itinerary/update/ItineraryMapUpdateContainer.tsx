import ItineraryCreateView from 'components/trip/itinerary/create/ItineraryCreateView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { IItineraryForm, IItineraryPayload, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface IItineraryMapUpdateContainerOwnProps {}

export interface IItineraryMapUpdateContainerStateProps {
  trip: ITrip;
}
export interface IItineraryMapUpdateContainerDispatchProps {
  itinerariesUpdate: (itineraryUpdatePayload: IItineraryPayload) => ITrackableAction;
}
type IItineraryMapUpdateContainerProps = IItineraryMapUpdateContainerOwnProps & IItineraryMapUpdateContainerStateProps & IItineraryMapUpdateContainerDispatchProps;

const ItineraryMapUpdateContainer: React.FC<IItineraryMapUpdateContainerProps> = (props: IItineraryMapUpdateContainerProps) => {
  const handleItineraryUpdate = useCallback(
    (values: IItineraryForm) => {
      return props.itinerariesUpdate({ ...values, tripId: props.trip.id });
    },
    [props.trip.id]
  );

  const mapInitialValues = useMemo(() => {
    const optimize = false;
    const transportationMethod = props.trip.itineraries[0].transportationMethod;
    const stops = props.trip.itineraries.flatMap((itinerary) => itinerary.itineraryElements);
    return { stops, transportationMethod, optimize };
  }, [props.trip.itineraries]);

  return <ItineraryCreateView initialValues={mapInitialValues} onSubmit={handleItineraryUpdate} />;
};

const mapStateToProps = (state: any): IItineraryMapUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IItineraryMapUpdateContainerDispatchProps => ({
  itinerariesUpdate: (itineraryUpdatePayload: IItineraryPayload) => dispatch(createTrackableAction(ItineraryBusinessStore.actions.itineraryUpdate(itineraryUpdatePayload))),
});

export default connect<IItineraryMapUpdateContainerStateProps, IItineraryMapUpdateContainerDispatchProps, IItineraryMapUpdateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ItineraryMapUpdateContainer);
