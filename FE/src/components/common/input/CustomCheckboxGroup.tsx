import { Checkbox, Form } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React from "react";

export interface ICustomCheckboxInputOwnProps {
  group: string;
  subgroup: string;
  initialItems: string[];
  className?: string;
}
type ICustomCheckboxInputProps = ICustomCheckboxInputOwnProps;

const CustomCheckboxInput: React.FC<ICustomCheckboxInputProps> = (
  props: ICustomCheckboxInputProps
) => {
  const handleChange = (checkedValue: CheckboxValueType[]) => {
    //console.log(checkedValue);
  };
  return (
    <Form.Item name={[props.group, props.subgroup]}>
      <Checkbox.Group
        onChange={handleChange}
        options={props.initialItems}
        className={"customCheckboxGroup__container " + (props.className ?? "")}
      />
    </Form.Item>
  );
};

export default CustomCheckboxInput;
