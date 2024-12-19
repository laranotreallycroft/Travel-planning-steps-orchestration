import ItineraryView from 'components/trip/itinerary/ItineraryView';
import ItineraryCreateView from 'components/trip/itinerary/create/ItineraryCreateView';
import { ITrip } from 'model/trip/Trip';
import { TransportationMethodEnum } from 'model/trip/itinerary/TransportationMethodEnum';
import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { IItineraryForm, IItineraryPayload, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
import { createTrackableAction, ITrackableAction } from 'service/util/trackAction';
import { v4 as uuidv4 } from 'uuid';

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

  return (
    <React.Fragment>
      {props.trip?.itineraries.length > 0 ? (
        <ItineraryView trip={props.trip} onItinerariesDelete={props.itineraryDelete} />
      ) : (
        <ItineraryCreateView onSubmit={handleItinerariesCreate} initialValues={{ stops: [{ location: props.trip.location, duration: 0, id: uuidv4(), start: true }], optimize: false, transportationMethod: TransportationMethodEnum.CAR }} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IItineraryContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IItineraryContainerDispatchProps => ({
  itineraryCreate: (itineraryCreatePayload: IItineraryPayload) => dispatch(createTrackableAction(ItineraryBusinessStore.actions.itineraryCreate(itineraryCreatePayload))),

  itineraryDelete: () => dispatch(ItineraryBusinessStore.actions.itineraryDelete()),
});

export default connect<IItineraryContainerStateProps, IItineraryContainerDispatchProps, IItineraryContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ItineraryContainer);
