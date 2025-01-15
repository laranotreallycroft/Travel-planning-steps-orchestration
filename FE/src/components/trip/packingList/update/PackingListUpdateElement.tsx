import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import CustomDropdownInput from 'components/common/input/CustomDropdownInput';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { IPackingListUpdatePayload } from 'service/business/trip/packingList/PackingListBusinessStore';

export interface IPackingListUpdateElementOwnProps {
  packingList: IPackingList;
  onPackingListChange: (packingListUpdatePayload: IPackingListUpdatePayload) => void;
  onPackingListDelete: (packingListId: number) => void;
}
type IPackingListUpdateElementProps = IPackingListUpdateElementOwnProps;

const PackingListUpdateElement: React.FC<IPackingListUpdateElementProps> = (props: IPackingListUpdateElementProps) => {
  const [form] = Form.useForm<IPackingListUpdatePayload>();

  return (
    <Form<IPackingListUpdatePayload>
      form={form}
      initialValues={{ items: props.packingList.items }}
      onValuesChange={(values: IPackingListUpdatePayload) =>
        props.onPackingListChange({
          packingListId: props.packingList.id,
          items: values.items,
        })
      }
    >
      <Row justify={'space-between'}>
        <Col span={20} className="margin-left-sm">
          <Title
            level={5}
            editable={{
              onChange: (value: string) =>
                props.onPackingListChange({
                  packingListId: props.packingList.id,
                  label: value,
                }),
              triggerType: ['text'],
              enterIcon: null,
            }}
          >
            {props.packingList.label}
          </Title>
        </Col>
        <Button icon={<CloseOutlined />} className="margin-left-sm packingListUpdateElement__deleteListButton" onClick={() => props.onPackingListDelete(props.packingList.id)} />
      </Row>
      <Form.Item name={'items'}>
        <CustomDropdownInput
          formItemName="items"
          initialOptions={props.packingList.items.map((item) => {
            return { label: item, value: item };
          })}
          additionalElementAddFunction={(items: string[]) =>
            props.onPackingListChange({
              packingListId: props.packingList.id,
              items: items,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default PackingListUpdateElement;
