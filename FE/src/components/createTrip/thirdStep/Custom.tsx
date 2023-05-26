import { Button, Col, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ILabelValue } from "../../../model/reminder/const";
import { ITrip } from "../../../model/trip/Trip";

export interface ICustomOwnProps {
  isHidden: boolean;
}
type ICustomProps = ICustomOwnProps;

const Custom: React.FC<ICustomProps> = (props: ICustomProps) => {
  const form = Form.useFormInstance<ITrip>();
  const [customReminders, setCustomReminders] = useState<ILabelValue[]>([]);

  const handleAdd = useCallback(
    (value: string) => {
      //remove whitespace from value
      const reminder = { label: value, value: value.replace(/\s+/g, "") };
      if (!customReminders.find((reminder) => reminder.label === value)) {
        const newCustomReminders = [...customReminders, reminder];
        setCustomReminders(newCustomReminders);
        newCustomReminders.map((value) => value.value);
        form.setFieldValue(
          ["reminders", "custom", "custom"],
          newCustomReminders.map((value) => value.value)
        );
      }
    },
    [customReminders]
  );

  const handleDelete = useCallback(
    (e: any, value: ILabelValue) => {
      e.stopPropagation();
      e.preventDefault();
      const newCustomReminders = [...customReminders].filter(
        (reminder) => reminder.label !== value.label
      );
      setCustomReminders(newCustomReminders);
      form.setFieldValue(
        ["reminders", "custom", "custom"],
        newCustomReminders.map((value) => value.value)
      );
    },
    [customReminders]
  );

  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Custom reminders
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input.Search
            placeholder="Add your own reminder"
            enterButton={<PlusOutlined />}
            size="large"
            onSearch={handleAdd}
            className="margin-bottom-md"
          />
          <Form.Item name={["reminders", "custom", "custom"]}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              className="thirdStep_customReminder"
            >
              {customReminders.map((item) => (
                <Select.Option key={item.value}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>{item.label}</div>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={(e) => handleDelete(e, item)}
                      size="small"
                    />
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Custom;
