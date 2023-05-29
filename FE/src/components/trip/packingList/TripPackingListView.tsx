import { Button, Col, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import {
  IPackingList,
  IPackingListType,
} from "../../../model/trip/packingList/PackingList";
import Basics from "./packingListGroups/Basics";
import Clothes from "./packingListGroups/Clothes";
import Hygiene from "./packingListGroups/Hygiene";
import Miscellaneous from "./packingListGroups/Miscellaneous";

export interface ITripPackingListViewOwnProps {}
type ITripPackingListViewProps = ITripPackingListViewOwnProps;

const TripPackingListView: React.FC<ITripPackingListViewProps> = (
  props: ITripPackingListViewProps
) => {
  const [form] = Form.useForm<IPackingList>();
  const PackingListType: IPackingListType = IPackingListType.COLD;

  const handleFinish = (values: IPackingList) => {
    console.log(values);
  };
  /* useEffect(() => {
    switch (PackingListType) {
        case IPackingListType.WARM: {
        const warmPackingLists = {
          ...travelPackingListsDefaultValues,
          ...travelPackingListsWarmValues,
        };
        return form.setFieldValue("PackingLists", warmPackingLists);
      }
      case IPackingListType.COLD: {
        const coldPackingLists = {
          ...travelPackingListsDefaultValues,
          ...travelPackingListsColdValues,
        };
        return form.setFieldValue("PackingLists", coldPackingLists);
      }
      default:
        return form.setFieldValue(travelPackingListsDefaultValues);
    }
  }, [PackingListType]);
*/
  return (
    <Form<IPackingList> form={form} onFinish={handleFinish}>
      <Row>
        <Col span={12} className="margin-bottom-xl">
          <Title level={3}>Edit packing list items or add your own</Title>
        </Col>
        <Col offset={10} span={1}>
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

export default TripPackingListView;
