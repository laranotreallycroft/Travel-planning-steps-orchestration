import { Button, Col, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { ILabelValue } from "model/common/input";
import { IPackingList } from "model/trip/packingList/PackingList";
import { IPackingListUpdatePayload } from "service/business/trip/packingList/PackingListBusinessStore";
import CustomDropdownInput from "components/common/input/CustomDropdownInput";
import { CloseOutlined } from "@ant-design/icons";

export interface IPackingListUpdateElementOwnProps {
  packingList: IPackingList;
  onPackingListChange: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) => void;
  onPackingListDelete: (packingListId: number) => void;
}
type IPackingListUpdateElementProps = IPackingListUpdateElementOwnProps;

const PackingListUpdateElement: React.FC<IPackingListUpdateElementProps> = (
  props: IPackingListUpdateElementProps
) => {
  const [form] = Form.useForm<IPackingListUpdatePayload>();
  const [dropdownItems, setDropdownItems] = useState<ILabelValue[]>(
    props.packingList.items.map((item) => {
      return { label: item, value: item };
    })
  );

  return (
    <Form<IPackingListUpdatePayload>
      form={form}
      initialValues={{ items: props.packingList.items }}
      onValuesChange={(values: IPackingListUpdatePayload) =>
        props.onPackingListChange({
          packingListId: props.packingList.id,
          items: values.items,
        })
      }
    >
      <Row justify={"space-between"}>
        <Col span={20} className="margin-left-sm">
          <Title
            level={5}
            editable={{
              onChange: (value: string) =>
                props.onPackingListChange({
                  packingListId: props.packingList.id,
                  label: value,
                }),
              triggerType: ["text"],
              enterIcon: null,
            }}
          >
            {props.packingList.label}
          </Title>
        </Col>
        <Button
          icon={<CloseOutlined />}
          className="margin-left-sm packingListUpdateElement__deleteListButton"
          onClick={() => props.onPackingListDelete(props.packingList.id)}
        />
      </Row>
      <CustomDropdownInput
        formItemName="items"
        dropdownItems={dropdownItems}
        setDropdownItems={setDropdownItems}
        additionalElementAddFunction={(items: string[]) =>
          props.onPackingListChange({
            packingListId: props.packingList.id,
            items: items,
          })
        }
      />
    </Form>
  );
};

export default PackingListUpdateElement;
