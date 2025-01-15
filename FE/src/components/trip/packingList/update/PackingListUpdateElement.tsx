import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Popconfirm, Row } from 'antd';
import CustomDropdownInput from 'components/common/input/CustomDropdownInput';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { useCallback } from 'react';
import { IPackingListUpdatePayload } from 'service/business/trip/packingList/PackingListBusinessStore';

export interface IPackingListUpdateElementOwnProps {
  packingList: IPackingList;
  onPackingListChange: (packingListUpdatePayload: IPackingListUpdatePayload) => void;
  onPackingListDelete: (packingListId: string) => void;
}
type IPackingListUpdateElementProps = IPackingListUpdateElementOwnProps & IWithLocalizeOwnProps;

const PackingListUpdateElement: React.FC<IPackingListUpdateElementProps> = (props: IPackingListUpdateElementProps) => {
  const [form] = Form.useForm<IPackingListUpdatePayload>();

  const handleValuesChange = useCallback(
    (changedValues: Partial<IPackingListUpdatePayload>, values: IPackingListUpdatePayload) => {
      props.onPackingListChange(values);
    },
    [props.onPackingListChange]
  );

  return (
    <Form<IPackingListUpdatePayload> form={form} initialValues={props.packingList} onValuesChange={handleValuesChange}>
      <Form.Item name={'id'} hidden={true} noStyle={true}>
        <Input />
      </Form.Item>
      <Row gutter={[8, 8]}>
        <Col flex={'auto'}>
          <Form.Item name="label">
            <Input />
          </Form.Item>
        </Col>

        <Popconfirm
          title={props.translate('PACKING_LIST_UPDATE.DELETE_MODAL.TITLE')}
          description={props.translate('PACKING_LIST_UPDATE.DELETE_MODAL.DESCRIPTION')}
          onConfirm={() => props.onPackingListDelete(props.packingList.id)}
          okText={props.translate('COMMON.YES')}
          cancelText={props.translate('COMMON.NO')}
          placement="topRight"
        >
          <Col>
            <Button icon={<CloseOutlined />} />
          </Col>
        </Popconfirm>
      </Row>
      <Form.Item name={'items'}>
        <CustomDropdownInput
          formItemName="items"
          initialOptions={props.packingList.items.map((item) => {
            return { label: item, value: item };
          })}
          additionalElementAddFunction={(items: string[]) =>
            props.onPackingListChange({
              id: props.packingList.id,
              items: items,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default withLocalize<IPackingListUpdateElementOwnProps>(PackingListUpdateElement as any);
