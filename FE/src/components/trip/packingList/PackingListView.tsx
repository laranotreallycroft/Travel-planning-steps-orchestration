import { Col, Row } from 'antd';
import PackingListCheckboxForm from 'components/trip/packingList/PackingListCheckboxForm';
import { IPackingList } from 'model/trip/packingList/PackingList';
import React from 'react';
import { IPackingListCheckedPayload } from 'service/business/trip/packingList/PackingListBusinessStore';

export interface IPackingListViewOwnProps {
  packingLists?: IPackingList[];
  onPackingListChecked: (packingListUpdatePayload: IPackingListCheckedPayload) => void;
}
type IPackingListViewProps = IPackingListViewOwnProps;

const PackingListView: React.FC<IPackingListViewProps> = (props: IPackingListViewProps) => {
  return (
    <Row gutter={[16, 16]}>
      {props.packingLists?.map((packingList) => {
        return (
          <Col key={packingList.id}>
            <PackingListCheckboxForm packingList={packingList} onPackingListChecked={props.onPackingListChecked} />
          </Col>
        );
      })}
    </Row>
  );
};

export default PackingListView;
