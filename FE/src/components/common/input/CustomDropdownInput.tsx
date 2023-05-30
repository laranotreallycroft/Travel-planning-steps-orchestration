import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { ILabelValue } from "../../../model/trip/const/packingList";

export interface ICustomDropdownInputOwnProps {
  group: string;
  subgroup: string;
  initialItems?: ILabelValue[];
}
type ICustomDropdownInputProps = ICustomDropdownInputOwnProps;

const CustomDropdownInput: React.FC<ICustomDropdownInputProps> = (
  props: ICustomDropdownInputProps
) => {
  const form = Form.useFormInstance<ITrip>();

  const [dropdownItems, setDropdownItems] = useState<ILabelValue[]>(
    props.initialItems ?? []
  );
  const [searchValue, setSearchValue] = useState("");

  const handleAdd = useCallback(
    (value: string) => {
      //remove whitespace from value
      const newDropdownItem = {
        label: value,
        value: value.replace(/\s+/g, ""),
      };
      if (
        newDropdownItem.value.length > 0 &&
        !dropdownItems.find((item) => item.label === value)
      ) {
        const newDropdownItems = [...dropdownItems, newDropdownItem];
        setDropdownItems(newDropdownItems);

        const selectedItems = form.getFieldValue([props.group, props.subgroup]);
        form.setFieldValue(
          [props.group, props.subgroup],
          [...(selectedItems ?? []), newDropdownItem.value]
        );
        setSearchValue("");
      }
    },
    [dropdownItems]
  );

  const handleDelete = useCallback(
    (e: any, value: ILabelValue) => {
      e.stopPropagation();
      e.preventDefault();
      const newDropdownItems = [...dropdownItems].filter(
        (item) => item.value !== value.value
      );
      setDropdownItems(newDropdownItems);

      const selectedItems = form.getFieldValue([props.group, props.subgroup]);
      form.setFieldValue(
        [props.group, props.subgroup],
        [...(selectedItems ?? [])].filter((item) => item !== value.value)
      );
    },
    [dropdownItems]
  );

  const notFoundContentRender = useMemo(
    () => (
      <div className="customInput__notFoundContentRender">
        No matches found
        <Button onClick={() => handleAdd(searchValue)} icon={<PlusOutlined />}>
          Create new
        </Button>
      </div>
    ),
    [searchValue]
  );

  const dropdownItemsRender = useMemo(() => {
    return dropdownItems.map((item) => (
      <Select.Option key={item.value}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{item.label}</div>
          <Button
            icon={<DeleteOutlined />}
            onClick={(e) => handleDelete(e, item)}
            size="small"
            className="customInput__deleteButton"
          />
        </div>
      </Select.Option>
    ));
  }, [dropdownItems]);

  return (
    <Form.Item name={[props.group, props.subgroup]}>
      <Select
        mode="multiple"
        allowClear
        placeholder="Please select"
        className="customInput"
        searchValue={searchValue}
        onSearch={setSearchValue}
        notFoundContent={notFoundContentRender}
      >
        {dropdownItemsRender}
      </Select>
    </Form.Item>
  );
};

export default CustomDropdownInput;
