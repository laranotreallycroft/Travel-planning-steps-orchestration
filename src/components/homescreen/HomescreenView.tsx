import { DatePicker, Form, Space } from "antd";

interface HomescreenViewProps {}

const { RangePicker } = DatePicker;
const HomescreenView: React.FC = (props: HomescreenViewProps) => {
  const [form] = Form.useForm<any>();
  return (
    <>
      <Form form={form}>
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      </Form>
    </>
  );
};

export default HomescreenView;
