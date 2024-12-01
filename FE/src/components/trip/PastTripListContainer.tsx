import PastTripListView from 'components/trip/PastTripListView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { ITripListFilter, TripListBusinessStore } from 'service/business/user/TripListBusinessStore';

export interface IPastTripListContainerOwnProps {}
export interface IPastTripListContainerStateProps {
  tripList: ITrip[];
}
export interface IPastTripListContainerDispatchProps {
  tripListFetch: (filter: ITripListFilter) => void;
  tripListClear: () => void;
}
type IPastTripListContainerProps = IPastTripListContainerOwnProps & IPastTripListContainerStateProps & IPastTripListContainerDispatchProps;

const PastTripListContainer: React.FC<IPastTripListContainerProps> = (props: IPastTripListContainerProps) => {
  const fetchTripList = useCallback(() => {
    props.tripListFetch({ pastOnly: true });
  }, [props.tripListFetch]);

  useEffect(() => {
    fetchTripList();
    return () => {
      props.tripListClear();
    };
  }, [fetchTripList]);

  return (
    <React.Fragment>
      <PastTripListView tripList={props.tripList} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IPastTripListContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
});

const mapDispatchToProps = (dispatch: any): IPastTripListContainerDispatchProps => ({
  tripListFetch: (filter: ITripListFilter) => dispatch(TripListBusinessStore.actions.tripListFetch(filter)),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),
});

export default connect<IPastTripListContainerStateProps, IPastTripListContainerDispatchProps, IPastTripListContainerOwnProps>(mapStateToProps, mapDispatchToProps)(PastTripListContainer);
