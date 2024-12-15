// -- Prop types
// ----------

import { Select } from 'antd';
import { IIdRef } from 'model/common/IdRef';
import { useCallback } from 'react';
import { LangUtils } from 'service/util/LangUtils';

export interface IDataSelectOwnProps<T> {
  options?: ISelectOption<T>[];
  value?: T | T[];
  defaultValue?: string;
  onChange?: (data?: T | T[]) => void;
  onSearch?: (value?: string) => void;
  placeholder?: string;
  enableSearch?: boolean;
  mode?: 'multiple';
  disabled?: boolean;
  className?: string;
  notFoundContent?: React.ReactNode;
  dropdownStyle?: any;
  hideValueAfterSelect?: boolean;
}
type IDataSelectProps<T> = IDataSelectOwnProps<T>;

export interface ISelectOption<T> {
  value: string | number;
  data: T;
  key: string | number;
  /** id is used as data-test-id */
  id: string | number;
  label: string;
}

// -- Component
// ----------

/** Display data select generic component */
export const DataSelect = <T extends IIdRef>(props: IDataSelectProps<T>) => {
  const handleSearch = useCallback((value: string) => props.onSearch?.(value), [props.onSearch]);

  const handleChange = useCallback(
    (value: string | string[], selected?: ISelectOption<T> | ISelectOption<T>[]) => {
      if (LangUtils.isArray(selected)) {
        const selectedDataList = selected.map((select) => select?.data);
        props.onChange?.(selectedDataList);
      } else {
        props.onChange?.(selected?.data);
      }
    },
    [props.onChange]
  );

  const getValueIds = useCallback(
    (value?: T | T[]): string | string[] | undefined => {
      if (LangUtils.isArray(value)) {
        return value.map((item) => item.id.toString());
      } else if (LangUtils.isJsObject(value)) {
        return value?.id.toString();
      } else return undefined;
    },
    [props.mode]
  );

  const handleClear = () => props.onChange?.();

  return (
    <Select<string | string[], ISelectOption<T>>
      defaultValue={props.defaultValue}
      className={props.className}
      disabled={props.disabled}
      onClear={handleClear}
      showSearch={props.enableSearch}
      onSearch={handleSearch}
      filterOption={props.enableSearch ? (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) : undefined}
      mode={props.mode}
      value={!props.hideValueAfterSelect ? getValueIds(props.value) : null}
      onChange={handleChange}
      placeholder={props.placeholder}
      notFoundContent={props.notFoundContent}
      options={props.options}
      dropdownStyle={props.dropdownStyle}
    />
  );
};
