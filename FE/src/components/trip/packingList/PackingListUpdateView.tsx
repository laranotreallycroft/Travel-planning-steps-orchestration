import { Button, Col, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import Basics from "./packingListGroups/Basics";
import Clothes from "./packingListGroups/Clothes";
import Hygiene from "./packingListGroups/Hygiene";
import Miscellaneous from "./packingListGroups/Miscellaneous";

export interface ITripPackingListUpdateViewOwnProps {
  currentTripPackingList: IPackingList;
  onTripPackingListUpdate: (packingListUpdatePayload: IPackingList) => void;
}
type ITripPackingListUpdateViewProps = ITripPackingListUpdateViewOwnProps;

const TripPackingListUpdateView: React.FC<ITripPackingListUpdateViewProps> = (
  props: ITripPackingListUpdateViewProps
) => {
  const [form] = Form.useForm<IPackingList>();

  const handleFinish = (values: IPackingList) => {
    console.log(values);
    props.onTripPackingListUpdate(values);
  };

  return (
    <Form<IPackingList>
      form={form}
      onFinish={handleFinish}
      initialValues={props.currentTripPackingList}
    >
      <Row>
        <Col span={12} className="margin-bottom-xl">
          <Title level={3}>Edit packing list items or add your own</Title>
        </Col>
        <Col offset={9} span={1}>
          <Button type="primary" onClick={form.submit}>
            Save
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

export default TripPackingListUpdateView;
