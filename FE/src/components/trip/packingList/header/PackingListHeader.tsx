import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { ITrip } from 'model/trip/Trip';
import PackingListCopyView, { IPackingListCopyForm } from 'components/trip/packingList/header/PackingListCopyView';
import PackingListCreateView, { IPackingListCreateForm } from 'components/trip/packingList/header/PackingListCreateView';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';

export interface IPackingListHeaderOwnProps {
  trip: ITrip;
  tripList?: ITrip[];
  onPackingListCreate: (packingListCreatePayload: IPackingListCreateForm) => void;
  onPackingListCopy: (packingListCopyPayload: IPackingListCopyForm) => void;
  toggleEdit: () => void;
}

type IPackingListHeaderProps = IPackingListHeaderOwnProps & IWithLocalizeOwnProps;

const PackingListHeader: React.FC<IPackingListHeaderProps> = (props: IPackingListHeaderProps) => {
  return (
    <Row justify={'end'} gutter={[16, 16]}>
      <PackingListCreateView onPackingListCreate={props.onPackingListCreate} />
      <PackingListCopyView trip={props.trip} tripList={props.tripList} onPackingListCopy={props.onPackingListCopy} />

      {props.trip.packingLists.length > 0 && (
        <Col>
          <Button type="primary" onClick={props.toggleEdit} icon={<EditOutlined />}>
            {props.translate('PACKING_LIST_HEADER.EDIT')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default withLocalize<IPackingListHeaderOwnProps>(PackingListHeader as any);
