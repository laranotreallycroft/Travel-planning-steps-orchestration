import { Button, Col, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import Basics from "./packingListGroups/Basics";
import Clothes from "./packingListGroups/Clothes";
import Hygiene from "./packingListGroups/Hygiene";
import Miscellaneous from "./packingListGroups/Miscellaneous";
import _ from "lodash";
import { useEffect } from "react";

export interface IPackingListViewOwnProps {
  packingList: IPackingList;
  packingListChecked: IPackingList;
  editPackingList: () => void;
  onPackingListCheckedUpdate: (packingListPayload: IPackingList) => void;
}
type IPackingListViewProps = IPackingListViewOwnProps;

const PackingListView: React.FC<IPackingListViewProps> = (
  props: IPackingListViewProps
) => {
  const [form] = Form.useForm<IPackingList>();
  useEffect(() => {
    form.setFieldsValue(props.packingListChecked);
  }, [props.packingListChecked]);

  const handleFormChange = (changedValues: any) => {
    props.onPackingListCheckedUpdate(
      _.merge(props.packingListChecked, changedValues)
    );
  };

  return (
    <Form<IPackingList>
      form={form}
      initialValues={props.packingListChecked}
      onValuesChange={handleFormChange}
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
      <Basics isEditing={false} packingList={props.packingList.basics} />
      <Miscellaneous
        isEditing={false}
        packingList={props.packingList.miscellaneous}
      />
      <Clothes isEditing={false} packingList={props.packingList.clothes} />
      <Hygiene isEditing={false} packingList={props.packingList.hygiene} />
    </Form>
  );
};

export default PackingListView;
