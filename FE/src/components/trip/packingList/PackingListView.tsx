import { Button, Col, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import Basics from "./packingListGroups/Basics";
import Clothes from "./packingListGroups/Clothes";
import Hygiene from "./packingListGroups/Hygiene";
import Miscellaneous from "./packingListGroups/Miscellaneous";

export interface IPackingListViewOwnProps {
  packingList: IPackingList;
  editPackingList: () => void;
  onPackingListUpdate: (packingListPayload: IPackingList) => void;
}
type IPackingListViewProps = IPackingListViewOwnProps;

const PackingListView: React.FC<IPackingListViewProps> = (
  props: IPackingListViewProps
) => {
  const [form] = Form.useForm<IPackingList>();

  const handleFinish = (values: IPackingList) => {
    //TODO CHECKLIST?? props.onPackingListUpdate(values);
  };

  return (
    <Form<IPackingList>
      form={form}
      onFinish={handleFinish}
      initialValues={props.packingList}
    >
      <Row>
        <Col span={12} className="margin-bottom-xl">
          <Title level={3}>Edit packing list items or add your own</Title>
        </Col>
        <Col offset={9} span={1}>
          <Button type="primary" onClick={props.editPackingList}>
            Edit packing list
          </Button>
        </Col>
      </Row>

      <Basics />
      <Miscellaneous />
      <Clothes />
      <Hygiene />
    </Form>
  );
};

export default PackingListView;
