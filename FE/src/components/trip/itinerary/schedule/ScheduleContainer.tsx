import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import ScheduleView from 'components/trip/itinerary/schedule/ScheduleView';
import { IItinerary } from 'model/trip/itinerary/Itinerary';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { IScheduleElement, ItineraryBusinessStore } from 'service/business/trip/itinerary/ItineraryBusinessStore';

export interface IScheduleContainerOwnProps {
  itineraries: IItinerary[];
  isEditing: boolean;
}

export interface IScheduleContainerStateProps {}
export interface IScheduleContainerDispatchProps {
  itineraryScheduleUpdate: (itineraryScheduleUpdatePayload: IScheduleElement[]) => void;
}

type IScheduleContainerProps = IScheduleContainerOwnProps & IScheduleContainerStateProps & IScheduleContainerDispatchProps;

const ScheduleContainer: React.FC<IScheduleContainerProps> = (props: IScheduleContainerProps) => {
  const handleItineraryScheduleUpdate = useCallback(
    (payload: IScheduleElement[]) => {
      props.itineraryScheduleUpdate(payload);
    },
    [props.itineraryScheduleUpdate]
  );

  return <ScheduleView itineraries={props.itineraries} isEditing={props.isEditing} onItineraryScheduleUpdate={handleItineraryScheduleUpdate} />;
};

const mapStateToProps = (state: any): IScheduleContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): IScheduleContainerDispatchProps => ({
  itineraryScheduleUpdate: (itineraryScheduleUpdatePayload: IScheduleElement[]) => dispatch(ItineraryBusinessStore.actions.itineraryScheduleUpdate(itineraryScheduleUpdatePayload)),
});

export default connect<IScheduleContainerStateProps, IScheduleContainerDispatchProps, IScheduleContainerOwnProps>(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
