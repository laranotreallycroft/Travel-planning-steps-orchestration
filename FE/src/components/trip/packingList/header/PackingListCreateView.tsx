import { FileAddOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal } from 'antd';
import CustomDropdownInput from 'components/common/input/CustomDropdownInput';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import React, { useCallback, useState } from 'react';

export interface IPackingListCreateViewOwnProps {
  onPackingListCreate: (packingListCreatePayload: IPackingListCreateForm) => void;
}
type IPackingListCreateViewProps = IPackingListCreateViewOwnProps & IWithLocalizeOwnProps;

export interface IPackingListCreateForm {
  label: string;
  items: string[];
}

const PackingListCreateView: React.FC<IPackingListCreateViewProps> = (props: IPackingListCreateViewProps) => {
  const [form] = Form.useForm<IPackingListCreateForm>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const toggleCreateModal = useCallback(() => {
    setIsCreateModalOpen((prevState) => !prevState);
  }, []);

  const handleModalClose = useCallback(() => {
    toggleCreateModal();
    form.resetFields();
  }, [toggleCreateModal]);

  const handleFinish = useCallback(
    (values: IPackingListCreateForm) => {
      props.onPackingListCreate(values);
      handleModalClose();
    },
    [props.onPackingListCreate, handleModalClose]
  );

  return (
    <Col>
      <Button onClick={toggleCreateModal} type="primary" icon={<FileAddOutlined />}>
        {props.translate('PACKING_LIST_HEADER.CREATE_NEW')}
      </Button>

      <Modal title={props.translate('PACKING_LIST_HEADER.MODAL_TITLE')} open={isCreateModalOpen} onCancel={handleModalClose} onOk={form.submit} okText={props.translate('COMMON.FORM.SUBMIT')}>
        <Form form={form} onFinish={handleFinish} requiredMark={false}>
          <Form.Item
            name={'label'}
            label={props.translate('PACKING_LIST_HEADER.LABEL.LABEL')}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Input placeholder={props.translate('PACKING_LIST_HEADER.LABEL.PLACEHOLDER')} />
          </Form.Item>
          <Form.Item name={'items'} label={props.translate('PACKING_LIST_HEADER.ITEMS.LABEL')}>
            <CustomDropdownInput formItemName="items" placeholder={props.translate('PACKING_LIST_HEADER.ITEMS.PLACEHOLDER')} />
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
};

export default withLocalize<IPackingListCreateViewOwnProps>(PackingListCreateView as any);
