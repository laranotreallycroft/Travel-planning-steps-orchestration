import PackingListView from 'components/trip/packingList/PackingListView';
import { IPackingListCreateForm } from 'components/trip/packingList/header/PackingListCreateView';
import PackingListHeader from 'components/trip/packingList/header/PackingListHeader';
import PackingListUpdateContainer from 'components/trip/packingList/update/PackingListUpdateContainer';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { ITripListFilter, TripListBusinessStore } from 'service/business/trip/TripListBusinessStore';
import { IPackingListCheckedPayload, IPackingListCopyPayload, IPackingListCreatePayload, PackingListBusinessStore } from 'service/business/trip/packingList/PackingListBusinessStore';

import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface IPackingListContainerOwnProps {}
export interface IPackingListContainerStateProps {
  tripList: ITrip[];
  trip: ITrip;
}
export interface IPackingListContainerDispatchProps {
  tripListFetch: (filter: ITripListFilter) => void;
  tripListClear: () => void;

  packingListCreate: (packingListCreatePayload: IPackingListCreatePayload) => void;
  packingListCopy: (packingListCopyPayload: IPackingListCopyPayload) => void;

  packingListChecked: (packingListCheckedPayload: IPackingListCheckedPayload) => ITrackableAction;
}
type IPackingListContainerProps = IPackingListContainerOwnProps & IPackingListContainerStateProps & IPackingListContainerDispatchProps;

const PackingListContainer: React.FC<IPackingListContainerProps> = (props: IPackingListContainerProps) => {
  useEffect(() => {
    props.tripListFetch({ upcomingOnly: true });

    return () => {
      props.tripListClear();
    };
  }, []);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  const handlePackingListCreate = useCallback(
    (values: IPackingListCreateForm) => {
      const payload: IPackingListCreatePayload = {
        ...values,
        tripId: props.trip.id,
      };
      props.packingListCreate(payload);
    },
    [props.trip.id]
  );
  const handlePackingListCopy = useCallback(
    (packingListIds: string[]) => {
      const payload: IPackingListCopyPayload = {
        packingListIds: packingListIds,
        tripId: props.trip.id,
      };

      props.packingListCopy(payload);
    },
    [props.trip.id]
  );

  return (
    <React.Fragment>
      {!isEditing && (
        <React.Fragment>
          <PackingListHeader trip={props.trip} tripList={props.tripList} onPackingListCreate={handlePackingListCreate} onPackingListCopy={handlePackingListCopy} toggleEdit={toggleEdit} />
          <PackingListView packingLists={props.trip.packingLists} onPackingListChecked={props.packingListChecked} />
        </React.Fragment>
      )}
      {isEditing && <PackingListUpdateContainer toggleEdit={toggleEdit} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IPackingListContainerStateProps => ({
  tripList: TripListBusinessStore.selectors.getTripList(state),
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IPackingListContainerDispatchProps => ({
  tripListFetch: (filter: ITripListFilter) => dispatch(TripListBusinessStore.actions.tripListFetch(filter)),
  tripListClear: () => dispatch(TripListBusinessStore.actions.tripListClear()),

  packingListCreate: (packingListCreatePayload: IPackingListCreatePayload) => dispatch(PackingListBusinessStore.actions.packingListCreate(packingListCreatePayload)),
  packingListCopy: (packingListCopyPayload: IPackingListCopyPayload) => dispatch(PackingListBusinessStore.actions.packingListCopy(packingListCopyPayload)),

  packingListChecked: (packingListCheckedPayload: IPackingListCheckedPayload) => dispatch(createTrackableAction(PackingListBusinessStore.actions.packingListChecked(packingListCheckedPayload))),
});

export default connect<IPackingListContainerStateProps, IPackingListContainerDispatchProps, IPackingListContainerOwnProps>(mapStateToProps, mapDispatchToProps)(PackingListContainer);
