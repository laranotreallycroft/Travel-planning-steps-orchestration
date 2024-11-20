import HomeLayoutView from 'components/home/HomeLayoutView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { IIdPayload } from 'service/business/common/types';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { TripListBusinessStore } from 'service/business/user/TripListBusinessStore';

export interface IHomeLayoutContainerOwnProps {}
export interface IHomeLayoutContainerStateProps {
  tripList: ITrip[];
  trip: ITrip;
}
export interface IHomeLayoutContainerDispatchProps {
  tripListFetch: () => void;
  tripListClear: () => void;
  tripFetch: (payload: IIdPayload) => void;
  tripClear: () => void;
}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps & IHomeLayoutContainerStateProps & IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (props: IHomeLayoutContainerProps) => {
  useEffect(() => {
    props.tripListFetch();
    return () => {
      props.tripListClear();
      props.tripClear();
    };
  }, []);

  const handleTripSelect = useCallback((selectedTripId: number) => {
    props.tripFetch({ id: selectedTripId });
  }, []);

  return <HomeLayoutView tripList={props.tripList} trip={props.trip} onTripSelect={handleTripSelect} />;
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IHomeLayoutContainerDispatchProps => ({
  tripListFetch: () => dispatch(TripListBusinessStore.actions.tripListFetch()),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),
  tripFetch: (payload: IIdPayload) => dispatch(TripBusinessStore.actions.tripFetch(payload)),
  tripClear: () => dispatch(TripBusinessStore.actions.tripClear()),
});

export default connect<IHomeLayoutContainerStateProps, IHomeLayoutContainerDispatchProps, IHomeLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(HomeLayoutContainer);
