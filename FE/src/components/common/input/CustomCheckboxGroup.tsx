import { Checkbox, Form } from "antd";
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
  return (
    <Form.Item name={[props.group, props.subgroup]}>
      <Checkbox.Group
        options={props.initialItems}
        className={"customCheckboxGroup__container " + (props.className ?? "")}
      />
    </Form.Item>
  );
};

export default CustomCheckboxInput;
