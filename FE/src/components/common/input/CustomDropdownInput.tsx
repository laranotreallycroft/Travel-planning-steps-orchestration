import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { ILabelValue } from 'model/common/input';
import React, { useCallback, useMemo, useState } from 'react';

export interface ICustomDropdownInputOwnProps {
  placeholder?: string;
  formItemName: string;
  value?: ILabelValue | ILabelValue[];
  initialOptions?: ILabelValue[];
  onChange?: (data?: ILabelValue | ILabelValue[]) => void;
  additionalElementAddFunction?: (items: string[]) => void;
}
type ICustomDropdownInputProps = ICustomDropdownInputOwnProps & IWithLocalizeOwnProps;

const CustomDropdownInput: React.FC<ICustomDropdownInputProps> = (props: ICustomDropdownInputProps) => {
  const form = Form.useFormInstance();

  const [options, setOptions] = useState<ILabelValue[] | undefined>(props.initialOptions);
  const [searchValue, setSearchValue] = useState('');

  const handleAdd = useCallback(
    (value: string) => {
      const newDropdownItem = {
        label: value,
        value: value,
      };

      const newOptions = [...(options ?? []), newDropdownItem];
      setOptions(newOptions);

      const selectedItems = form.getFieldValue(props.formItemName);
      form.setFieldValue(props.formItemName, [...(selectedItems ?? []), newDropdownItem.value]);
      props.additionalElementAddFunction?.([...(selectedItems ?? []), newDropdownItem.value]);

      setSearchValue('');
    },
    [options, props.additionalElementAddFunction]
  );

  const addButton = useMemo(() => {
    const isDisabled = searchValue.length === 0 || options?.some((option) => option.label === searchValue);

    return (
      <Button onClick={() => handleAdd(searchValue)} disabled={isDisabled} icon={<PlusOutlined />} className="fullWidth margin-bottom-sm">
        {props.translate('CUSTOM_DROPDOWN_INPUT.ADD')}
      </Button>
    );
  }, [searchValue, options]);

  return (
    <Select
      value={props.value}
      placeholder={props.placeholder}
      mode="multiple"
      allowClear
      options={options}
      className="customDropdownInput"
      searchValue={searchValue}
      onSearch={setSearchValue}
      onChange={props.onChange}
      notFoundContent={<></>}
      dropdownRender={(menu) => (
        <React.Fragment>
          {addButton}
          {menu}
        </React.Fragment>
      )}
    ></Select>
  );
};

export default withLocalize<ICustomDropdownInputOwnProps>(CustomDropdownInput as any);
