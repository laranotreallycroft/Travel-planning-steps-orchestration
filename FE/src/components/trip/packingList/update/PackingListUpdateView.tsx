import { Col, Row } from "antd";
import { IPackingList } from "../../../../model/trip/packingList/PackingList";
import { IPackingListUpdatePayload } from "../../../../service/business/trip/packingList/PackingListBusinessStore";
import PackingListUpdateElement from "./PackingListUpdateElement";

export interface IPackingListUpdateViewOwnProps {
  packingLists: IPackingList[];
  onPackingListChange: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) => void;
}
type IPackingListUpdateViewProps = IPackingListUpdateViewOwnProps;

const PackingListUpdateView: React.FC<IPackingListUpdateViewProps> = (
  props: IPackingListUpdateViewProps
) => {
  return (
    <Row gutter={16}>
      {props.packingLists.map((packingList) => (
        <Col span={6} key={packingList.id}>
          <PackingListUpdateElement
            onPackingListChange={props.onPackingListChange}
            packingList={packingList}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PackingListUpdateView;
