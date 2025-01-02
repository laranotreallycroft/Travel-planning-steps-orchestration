import ItineraryCreateView from 'components/trip/itinerary/create/ItineraryCreateView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { IItineraryForm, IItineraryPayload, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface IItineraryUpdateContainerOwnProps {
  onItineraryUpdate: () => void;
}

export interface IItineraryUpdateContainerStateProps {
  trip: ITrip;
}

export interface IItineraryUpdateContainerDispatchProps {
  itineraryUpdate: (payload: IItineraryPayload) => ITrackableAction;
}

type IItineraryUpdateContainerProps = IItineraryUpdateContainerOwnProps & IItineraryUpdateContainerStateProps & IItineraryUpdateContainerDispatchProps;

const ItineraryUpdateContainer: React.FC<IItineraryUpdateContainerProps> = (props: IItineraryUpdateContainerProps) => {
  const handleItineraryUpdate = useCallback(
    (values: IItineraryForm) => {
      props
        .itineraryUpdate({ ...values, tripId: props.trip.id })
        .track()
        .subscribe(() => {
          props.onItineraryUpdate();
        });
    },
    [props.trip.id, props.onItineraryUpdate]
  );

  const mapInitialValues = useMemo(() => {
    const optimize = false;
    const transportationMethod = props.trip.itineraries[0].transportationMethod;
    const stops = props.trip.itineraries.flatMap((itinerary) => itinerary.itineraryElements);
    return { stops, transportationMethod, optimize };
  }, [props.trip.itineraries]);

  return <ItineraryCreateView initialValues={mapInitialValues} onSubmit={handleItineraryUpdate} />;
};

const mapStateToProps = (state: any): IItineraryUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IItineraryUpdateContainerDispatchProps => ({
  itineraryUpdate: (itineraryUpdatePayload: IItineraryPayload) => dispatch(createTrackableAction(ItineraryBusinessStore.actions.itineraryUpdate(itineraryUpdatePayload))),
});

export default connect<IItineraryUpdateContainerStateProps, IItineraryUpdateContainerDispatchProps, IItineraryUpdateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ItineraryUpdateContainer);
