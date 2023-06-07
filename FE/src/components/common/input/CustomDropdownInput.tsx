import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { ILabelValue } from "../../../model/common/input";
import { ITrip } from "../../../model/trip/Trip";

export interface ICustomDropdownInputOwnProps {
  group: string;
  subgroup: string;
  initialItems: string[];
}
type ICustomDropdownInputProps = ICustomDropdownInputOwnProps;

const CustomDropdownInput: React.FC<ICustomDropdownInputProps> = (
  props: ICustomDropdownInputProps
) => {
  const form = Form.useFormInstance<ITrip>();

  const [dropdownItems, setDropdownItems] = useState<ILabelValue[]>(
    props.initialItems
      ? props.initialItems.map((item) => {
          return { label: item, value: item };
        })
      : []
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

  const notFoundContentRender = useMemo(
    () => (
      <div className="customDropdownInput__notFoundContentRender">
        No matches found
        <Button onClick={() => handleAdd(searchValue)} icon={<PlusOutlined />}>
          Create new
        </Button>
      </div>
    ),
    [searchValue]
  );

  return (
    <Form.Item name={[props.group, props.subgroup]}>
      <Select
        mode="multiple"
        allowClear
        placeholder="Please select"
        className="customDropdownInput"
        searchValue={searchValue}
        onSearch={setSearchValue}
        notFoundContent={notFoundContentRender}
        options={dropdownItems}
      ></Select>
    </Form.Item>
  );
};

export default CustomDropdownInput;
