import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import ReturnHeader from 'components/common/ReturnHeader';
import TripCard from 'components/trip/list/TripCard';
import TripTabs from 'components/trip/TripTabs';
import { ITrip } from 'model/trip/Trip';
import moment from 'moment';
import React from 'react';

export interface ITripViewOwnProps {
  trip: ITrip;
}

type ITripViewProps = ITripViewOwnProps & IWithLocalizeOwnProps;

const TripView: React.FC<ITripViewProps> = (props: ITripViewProps) => {
  const isUpcoming = moment(props.trip.dateTo).isAfter();
  return (
    <React.Fragment>
      <ReturnHeader label={isUpcoming ? props.translate('TRIP_VIEW.RETURN_TO_UPCOMING') : props.translate('TRIP_VIEW.RETURN_TO_PAST')} to={isUpcoming ? '/trips/upcoming' : '/trips/past'} />
      <TripCard trip={props.trip} />
      <TripTabs />
    </React.Fragment>
  );
};

export default withLocalize<ITripViewOwnProps>(TripView as any);
