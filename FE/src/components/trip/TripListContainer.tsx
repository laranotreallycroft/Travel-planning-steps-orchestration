import TripCreateContainer from 'components/trip/create/TripCreateContainer';
import TripListView from 'components/trip/TripListView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TripListBusinessStore } from 'service/business/user/TripListBusinessStore';

export interface ITripListContainerOwnProps {}
export interface ITripListContainerStateProps {
  tripList: ITrip[];
}
export interface ITripListContainerDispatchProps {
  tripListFetch: () => void;
  tripListClear: () => void;
}
type ITripListContainerProps = ITripListContainerOwnProps & ITripListContainerStateProps & ITripListContainerDispatchProps;

const TripListContainer: React.FC<ITripListContainerProps> = (props: ITripListContainerProps) => {
  const [isTripCreateModalOpen, setIsTripCreateModalOpen] = useState<boolean>(false);

  const toggleTripCreateModal = useCallback(() => {
    setIsTripCreateModalOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    props.tripListFetch();
    return () => {
      props.tripListClear();
    };
  }, []);

  return (
    <React.Fragment>
      <TripListView tripList={props.tripList} onTripCreateModalOpen={toggleTripCreateModal} />
      <TripCreateContainer onTripCreateModalClose={toggleTripCreateModal} isTripCreateModalOpen={isTripCreateModalOpen} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): ITripListContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
});

const mapDispatchToProps = (dispatch: any): ITripListContainerDispatchProps => ({
  tripListFetch: () => dispatch(TripListBusinessStore.actions.tripListFetch()),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),
});

export default connect<ITripListContainerStateProps, ITripListContainerDispatchProps, ITripListContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripListContainer);
