import { Button, DatePicker, Form, Input } from "antd";
import { IBasicTravelInfoPayload } from "./HomescreenContainer";

interface IHomescreenViewProps {
  onFinish: (values: IBasicTravelInfoPayload) => void;
}

const { RangePicker } = DatePicker;
const { Search } = Input;

const HomescreenView: React.FC<IHomescreenViewProps> = (
  props: IHomescreenViewProps
) => {
  const [form] = Form.useForm<any>();
  return (
    <>
      <Form form={form} onFinish={props.onFinish}>
        <Form.Item name={"dateFromTo"}>
          <RangePicker />
        </Form.Item>
        <Form.Item name={"location"}>
          <Search
            placeholder="input location"
            onSearch={(e) => console.log(e)}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Button onClick={form.submit}>submit</Button>
      </Form>
    </>
  );
};

export default HomescreenView;
