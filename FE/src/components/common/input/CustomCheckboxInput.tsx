import { Checkbox, Form } from "antd";
import React from "react";
import { IPackingListUpdatePayload } from "../../../service/business/trip/packingList/PackingListBusinessStore";
import { IPackingList } from "../../../model/trip/packingList/PackingList";
import Title from "antd/es/typography/Title";

export interface ICustomCheckboxInputOwnProps {
  packingList: IPackingList;
  onPackingListChecked: (
    packingListUpdatePayload: IPackingListUpdatePayload
  ) => void;
}
type ICustomCheckboxInputProps = ICustomCheckboxInputOwnProps;

const CustomCheckboxInput: React.FC<ICustomCheckboxInputProps> = (
  props: ICustomCheckboxInputProps
) => {
  const [form] = Form.useForm<IPackingListUpdatePayload>();
  return (
    <Form<IPackingListUpdatePayload>
      form={form}
      initialValues={{ checkedItems: props.packingList.checkedItems }}
      onValuesChange={(changedValues) =>
        props.onPackingListChecked({
          packingListId: props.packingList.id,
          items: changedValues.checkedItems,
        })
      }
    >
      <Title level={5}>{props.packingList.label}</Title>
      <Form.Item name={"checkedItems"}>
        <Checkbox.Group
          options={props.packingList.items}
          className={"customCheckboxGroup__container"}
        />
      </Form.Item>
    </Form>
  );
};

export default CustomCheckboxInput;
