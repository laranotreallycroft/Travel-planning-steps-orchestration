import TripCreateContainer from 'components/trip/create/TripCreateContainer';
import UpcomingTripListView from 'components/trip/UpcomingTripListView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ITripListFilter, TripListBusinessStore } from 'service/business/user/TripListBusinessStore';

export interface ITripListContainerOwnProps {}
export interface ITripListContainerStateProps {
  tripList: ITrip[];
}
export interface ITripListContainerDispatchProps {
  tripListFetch: (filter: ITripListFilter) => void;
  tripListClear: () => void;
}
type ITripListContainerProps = ITripListContainerOwnProps & ITripListContainerStateProps & ITripListContainerDispatchProps;

const TripListContainer: React.FC<ITripListContainerProps> = (props: ITripListContainerProps) => {
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
      <UpcomingTripListView tripList={props.tripList} onTripCreateModalOpen={toggleTripCreateModal} />
      {isTripCreateModalOpen && <TripCreateContainer onTripCreate={fetchTripList} onTripCreateModalClose={toggleTripCreateModal} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): ITripListContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
});

const mapDispatchToProps = (dispatch: any): ITripListContainerDispatchProps => ({
  tripListFetch: (filter: ITripListFilter) => dispatch(TripListBusinessStore.actions.tripListFetch(filter)),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),
});

export default connect<ITripListContainerStateProps, ITripListContainerDispatchProps, ITripListContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripListContainer);
