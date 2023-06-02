import { Button, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import Basics from "./packingListGroups/Basics";
import Clothes from "./packingListGroups/Clothes";
import Hygiene from "./packingListGroups/Hygiene";
import Miscellaneous from "./packingListGroups/Miscellaneous";

export interface IPackingListUpdateViewOwnProps {
  packingList: IPackingList;
  onPackingListUpdate: (packingListUpdatePayload: IPackingList) => void;
}
type IPackingListUpdateViewProps = IPackingListUpdateViewOwnProps;

const PackingListUpdateView: React.FC<IPackingListUpdateViewProps> = (
  props: IPackingListUpdateViewProps
) => {
  const [form] = Form.useForm<IPackingList>();

  const handleFinish = (values: IPackingList) => {
    props.onPackingListUpdate(values);
  };

  return (
    <Form<IPackingList>
      form={form}
      onFinish={handleFinish}
      initialValues={props.packingList}
    >
      <Row justify={"space-between"}>
        <Title level={3} className="margin-bottom-xl">
          Edit packing list items or add your own
        </Title>

        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Row>

      <Basics isEditing={true} packingList={props.packingList.basics} />
      <Miscellaneous
        isEditing={true}
        packingList={props.packingList.miscellaneous}
      />
      <Clothes isEditing={true} packingList={props.packingList.clothes} />
      <Hygiene isEditing={true} packingList={props.packingList.hygiene} />

      <Row justify={"end"}>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default PackingListUpdateView;
