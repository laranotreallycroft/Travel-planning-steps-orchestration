import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { ILabelValue } from "../../../model/common/input";

export interface ICustomDropdownInputOwnProps {
  formItemName: string;
  label?: string;
  dropdownItems: ILabelValue[];
  setDropdownItems?: (items: ILabelValue[]) => void;
  additionalElementAddFunction?: (items: string[]) => void;
}
type ICustomDropdownInputProps = ICustomDropdownInputOwnProps;

const CustomDropdownInput: React.FC<ICustomDropdownInputProps> = (
  props: ICustomDropdownInputProps
) => {
  const form = Form.useFormInstance();

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
        !props.dropdownItems.find((item) => item.label === value)
      ) {
        const newDropdownItems = [...props.dropdownItems, newDropdownItem];
        props.setDropdownItems?.(newDropdownItems);

        const selectedItems = form.getFieldValue(props.formItemName);
        form.setFieldValue(props.formItemName, [
          ...(selectedItems ?? []),
          newDropdownItem.value,
        ]);
        props.additionalElementAddFunction?.([
          ...(selectedItems ?? []),
          newDropdownItem.value,
        ]);

        setSearchValue("");
      }
    },
    [props.dropdownItems]
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
    <Form.Item name={props.formItemName} label={props.label}>
      <Select
        mode="multiple"
        allowClear
        placeholder="Packing list items"
        className="customDropdownInput"
        searchValue={searchValue}
        onSearch={setSearchValue}
        notFoundContent={notFoundContentRender}
        options={props.dropdownItems}
      ></Select>
    </Form.Item>
  );
};

export default CustomDropdownInput;
