import { Checkbox, Form, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import { IPackingList } from 'model/trip/packingList/PackingList';
import React, { useCallback } from 'react';
import { IPackingListCheckedPayload } from 'service/business/trip/packingList/PackingListBusinessStore';

export interface IPackingListCheckboxFormOwnProps {
  packingList: IPackingList;
  onPackingListChecked: (packingListUpdatePayload: IPackingListCheckedPayload) => void;
}
type IPackingListCheckboxFormProps = IPackingListCheckboxFormOwnProps;

const PackingListCheckboxForm: React.FC<IPackingListCheckboxFormProps> = (props: IPackingListCheckboxFormProps) => {
  const [form] = Form.useForm<IPackingListCheckedPayload>();

  const handleValuesChange = useCallback(
    (changedValues: Partial<IPackingListCheckedPayload>, values: IPackingListCheckedPayload) => {
      props.onPackingListChecked(values);
    },
    [props.onPackingListChecked]
  );

  return (
    <Form<IPackingListCheckedPayload> form={form} initialValues={props.packingList} onValuesChange={handleValuesChange}>
      <Title level={5}>{props.packingList.label}</Title>
      <Form.Item name={'id'} hidden={true} noStyle={true}>
        <Input />
      </Form.Item>
      <Form.Item name={'checkedItems'}>
        <Checkbox.Group options={props.packingList.items} className={'customCheckboxGroup__container'} />
      </Form.Item>
    </Form>
  );
};

export default PackingListCheckboxForm;
