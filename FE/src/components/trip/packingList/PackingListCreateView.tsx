import { Avatar, Button, Col, Form, Radio, Row } from "antd";
import basic from "../../../asset/img/basic.jpg";
import cold from "../../../asset/img/cold.jpg";
import warm from "../../../asset/img/warm.jpg";
import {
  IPackingList,
  IPackingListType,
} from "../../../model/trip/packingList/PackingList";
import Title from "antd/es/typography/Title";
import {
  travelPackingListsColdValues,
  travelPackingListsDefaultValues,
  travelPackingListsWarmValues,
} from "../../../model/trip/const/packingList";
import _ from "lodash";

export interface ITripPackingListCreateViewOwnProps {
  onTripPackingListCreate: (packingListCreatePayload: IPackingList) => void;
}
type ITripPackingListCreateViewProps = ITripPackingListCreateViewOwnProps;

export interface IPackingListCreateForm {
  packingListType: IPackingListType;
}
const TripPackingListCreateView: React.FC<ITripPackingListCreateViewProps> = (
  props: ITripPackingListCreateViewProps
) => {
  const [form] = Form.useForm<IPackingListCreateForm>();

  const handleFinish = (values: IPackingListCreateForm) => {
    const initialPackingListValues =
      values.packingListType === IPackingListType.WARM
        ? _.merge(travelPackingListsDefaultValues, travelPackingListsWarmValues)
        : values.packingListType === IPackingListType.COLD
        ? _.merge(travelPackingListsDefaultValues, travelPackingListsColdValues)
        : travelPackingListsDefaultValues;
    props.onTripPackingListCreate(initialPackingListValues);
  };

  return (
    <Form<IPackingListCreateForm>
      form={form}
      onFinish={handleFinish}
      initialValues={{ packingListType: IPackingListType.DEFAULT }}
    >
      <Row>
        <Col className="margin-bottom-xl ">
          <Title level={3}>Which describes your trip you the best?</Title>
        </Col>
      </Row>

      <Form.Item name={"packingListType"}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button
            value={IPackingListType.DEFAULT}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={basic} alt="defaultReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5}>Basic</Title>
          </Radio.Button>
          <Radio.Button
            value={IPackingListType.WARM}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={warm} alt="warmReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5}>Warm</Title>
          </Radio.Button>
          <Radio.Button
            value={IPackingListType.COLD}
            className="secondStep__radioButton"
          >
            <Avatar
              src={<img src={cold} alt="coldReminder" />}
              shape="square"
              className="secondStep__reminderIcon"
            />
            <Title level={5}>Cold</Title>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Button type="primary" onClick={form.submit}>
        Create Packing List Reminders
      </Button>
    </Form>
  );
};

export default TripPackingListCreateView;
