import { FileAddOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal } from "antd";
import React, { useCallback, useState } from "react";
import { ILabelValue } from "../../../../model/common/input";
import CustomDropdownInput from "../../../common/input/CustomDropdownInput";

export interface IPackingListCreateViewOwnProps {
  onPackingListCreate: (
    packingListCreatePayload: IPackingListCreateForm
  ) => void;
}
type IPackingListCreateViewProps = IPackingListCreateViewOwnProps;

export interface IPackingListCreateForm {
  label: string;
  items: string[];
}
const PackingListCreateView: React.FC<IPackingListCreateViewProps> = (
  props: IPackingListCreateViewProps
) => {
  const [form] = Form.useForm<IPackingListCreateForm>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [dropdownItems, setDropdownItems] = useState<ILabelValue[]>([]);
  const toggleCreateModal = useCallback(() => {
    setIsCreateModalOpen((prevState) => !prevState);
  }, []);

  const handleModalClose = useCallback(() => {
    toggleCreateModal();
    form.resetFields();
    setDropdownItems([]);
  }, []);

  const handleFinish = useCallback(
    (values: IPackingListCreateForm) => {
      props.onPackingListCreate(values);
      handleModalClose();
    },
    [props.onPackingListCreate]
  );

  return (
    <Col>
      <Button
        onClick={toggleCreateModal}
        type="primary"
        icon={<FileAddOutlined />}
      >
        Create
      </Button>

      <Modal
        title="Create packing list"
        open={isCreateModalOpen}
        onCancel={handleModalClose}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleFinish} requiredMark={false}>
          <Form.Item
            name={"label"}
            label={"Label"}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input placeholder="Packing list label" />
          </Form.Item>
          <CustomDropdownInput
            label="Items"
            formItemName="items"
            dropdownItems={dropdownItems}
            setDropdownItems={setDropdownItems}
          />
        </Form>
      </Modal>
    </Col>
  );
};

export default PackingListCreateView;
