import TripCreateContainer from 'components/trip/create/TripCreateContainer';
import UpcomingTripListView from 'components/trip/list/UpcomingTripListView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ITripListFilter, TripListBusinessStore } from 'service/business/trip/TripListBusinessStore';

export interface IUpcomingTripListContainerOwnProps {}
export interface IUpcomingTripListContainerStateProps {
  tripList: ITrip[];
}
export interface IUpcomingTripListContainerDispatchProps {
  tripListFetch: (filter: ITripListFilter) => void;
  tripListClear: () => void;
}
type IUpcomingTripListContainerProps = IUpcomingTripListContainerOwnProps & IUpcomingTripListContainerStateProps & IUpcomingTripListContainerDispatchProps;

const UpcomingTripListContainer: React.FC<IUpcomingTripListContainerProps> = (props: IUpcomingTripListContainerProps) => {
  const [isTripCreateModalOpen, setIsTripCreateModalOpen] = useState<boolean>(false);

  const toggleTripCreateModal = useCallback(() => {
    setIsTripCreateModalOpen((prevState) => !prevState);
  }, []);

  const fetchTripList = useCallback(() => {
    props.tripListFetch({ upcomingOnly: true });
  }, [props.tripListFetch]);

  useEffect(() => {
    fetchTripList();
    return () => {
      props.tripListClear();
    };
  }, [fetchTripList]);

  return (
    <React.Fragment>
      {props.tripList && <UpcomingTripListView tripList={props.tripList} onTripCreateModalOpen={toggleTripCreateModal} />} {isTripCreateModalOpen && <TripCreateContainer onTripCreateModalClose={toggleTripCreateModal} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IUpcomingTripListContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
});

const mapDispatchToProps = (dispatch: any): IUpcomingTripListContainerDispatchProps => ({
  tripListFetch: (filter: ITripListFilter) => dispatch(TripListBusinessStore.actions.tripListFetch(filter)),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),
});

export default connect<IUpcomingTripListContainerStateProps, IUpcomingTripListContainerDispatchProps, IUpcomingTripListContainerOwnProps>(mapStateToProps, mapDispatchToProps)(UpcomingTripListContainer);
