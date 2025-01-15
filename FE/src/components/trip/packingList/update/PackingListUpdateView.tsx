import { Col, Row } from 'antd';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { IPackingListUpdatePayload } from 'service/business/trip/packingList/PackingListBusinessStore';
import PackingListUpdateElement from 'components/trip/packingList/update/PackingListUpdateElement';
import { useCallback, useState } from 'react';

export interface IPackingListUpdateViewOwnProps {
  packingLists?: IPackingList[];
  onPackingListChange: (packingListUpdatePayload: IPackingListUpdatePayload) => void;
  onPackingListDelete: (packingListId: number) => void;
}
type IPackingListUpdateViewProps = IPackingListUpdateViewOwnProps;

const PackingListUpdateView: React.FC<IPackingListUpdateViewProps> = (props: IPackingListUpdateViewProps) => {
  const [packingLists, setPackingLists] = useState(props.packingLists);

  const handlePackingListDelete = useCallback(
    (id: number) => {
      setPackingLists((value) => value?.filter((packingList) => packingList.id !== id));
      props.onPackingListDelete(id);
    },
    [props.onPackingListDelete]
  );

  return (
    <Row gutter={16}>
      {packingLists?.map((packingList) => (
        <Col span={6} key={packingList.id}>
          <PackingListUpdateElement onPackingListChange={props.onPackingListChange} packingList={packingList} onPackingListDelete={handlePackingListDelete} />
        </Col>
      ))}
    </Row>
  );
};

export default PackingListUpdateView;
