import { ITrip } from 'model/trip/Trip';
import React from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { IItineraryPayload, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';
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
  /* const handleItineraryUpdate = useCallback(
    (values: IItineraryPayload) => {
      return props.itinerariesUpdate(values);
    },
    [props.trip.id]
  );*/

  return (
    <React.Fragment>
      {
        //<ItineraryCreateView trip={props.trip} onSubmit={handleItineraryUpdate} />
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IItineraryMapUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IItineraryMapUpdateContainerDispatchProps => ({
  itinerariesUpdate: (itineraryUpdatePayload: IItineraryPayload) => dispatch(createTrackableAction(ItineraryBusinessStore.actions.itineraryUpdate(itineraryUpdatePayload))),
});

export default connect<IItineraryMapUpdateContainerStateProps, IItineraryMapUpdateContainerDispatchProps, IItineraryMapUpdateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ItineraryMapUpdateContainer);
