import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import PackingListUpdateView from 'components/trip/packingList/update/PackingListUpdateView';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { IPackingListUpdateCombinedPayload, IPackingListUpdatePayload, PackingListBusinessStore } from 'service/business/trip/packingList/PackingListBusinessStore';
import { TripBusinessStore } from 'service/business/trip/TripBusinessStore';
import { ITrackableAction, createTrackableAction } from 'service/util/trackAction';

export interface IPackingListUpdateContainerOwnProps {
  toggleEdit: () => void;
}
export interface IPackingListUpdateContainerStateProps {
  trip: ITrip;
}
export interface IPackingListUpdateContainerDispatchProps {
  packingListUpdate: (packingListUpdatePayload: IPackingListUpdateCombinedPayload) => ITrackableAction;
}
type IPackingListUpdateContainerProps = IPackingListUpdateContainerOwnProps & IPackingListUpdateContainerStateProps & IPackingListUpdateContainerDispatchProps & IWithLocalizeOwnProps;

const PackingListUpdateContainer: React.FC<IPackingListUpdateContainerProps> = (props: IPackingListUpdateContainerProps) => {
  const [changedPackingLists, setChangedPackingLists] = useState<IPackingListUpdatePayload[]>([]);
  const [deletedPackingLists, setDeletedPackingLists] = useState<number[]>([]);

  const handlePackingListChange = useCallback(
    (payload: IPackingListUpdatePayload) => {
      setChangedPackingLists((prevLists) => {
        const existingList = prevLists.find((list) => list.id === payload.id);
        if (existingList) {
          return prevLists.map((list) => (list.id === payload.id ? { ...list, ...payload } : list));
        }
        return [...prevLists, payload];
      });
    },
    [setChangedPackingLists]
  );

  const handlePackingListDelete = useCallback(
    (packingListId: number) => {
      setDeletedPackingLists((value) => [...value, packingListId]);
    },
    [setDeletedPackingLists]
  );

  const handlePackingListUpdate = useCallback(() => {
    if (changedPackingLists.length > 0 || deletedPackingLists.length > 0)
      props
        .packingListUpdate({
          update: changedPackingLists,
          delete: deletedPackingLists,
        })
        .track()
        .subscribe(() => props.toggleEdit());
    else {
      props.toggleEdit();
    }
  }, [changedPackingLists, deletedPackingLists]);

  return (
    <React.Fragment>
      <Row justify={'end'} gutter={[16, 16]}>
        <Col>
          <Button type="primary" onClick={props.toggleEdit} icon={<CloseOutlined />}>
            {props.translate('COMMON.CANCEL')}
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handlePackingListUpdate} icon={<SaveOutlined />}>
            {props.translate('COMMON.SAVE')}
          </Button>
        </Col>
      </Row>
      <PackingListUpdateView packingLists={props.trip.packingLists} onPackingListChange={handlePackingListChange} onPackingListDelete={handlePackingListDelete} />
    </React.Fragment>
  );
};
const mapStateToProps = (state: any): IPackingListUpdateContainerStateProps => ({
  trip: TripBusinessStore.selectors.getTrip(state),
});

const mapDispatchToProps = (dispatch: any): IPackingListUpdateContainerDispatchProps => ({
  packingListUpdate: (packingListUpdatePayload: IPackingListUpdateCombinedPayload) => dispatch(createTrackableAction(PackingListBusinessStore.actions.packingListUpdate(packingListUpdatePayload))),
});

export default connect<IPackingListUpdateContainerStateProps, IPackingListUpdateContainerDispatchProps, IPackingListUpdateContainerOwnProps>(mapStateToProps, mapDispatchToProps)(withLocalize<IPackingListUpdateContainerOwnProps>(PackingListUpdateContainer as any));
