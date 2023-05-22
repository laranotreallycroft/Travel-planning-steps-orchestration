import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React from "react";
import { TableDataType } from "../ThirdStep";
import { PlusOutlined } from "@ant-design/icons";
const travelAids = [
  {
    title: "Pleasure Reading",
    dataIndex: "pleasureReading",
    key: "pleasureReading",
    group: "Custom",
    groupTitle: "Custom",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
];

export interface ICustomOwnProps {
  isHidden: boolean;
  columns: ColumnsType<TableDataType>;
  selectedRowKeys: React.Key[];
  onSelect: (record: TableDataType, selected: boolean) => void;
}
type ICustomProps = ICustomOwnProps;

const Custom: React.FC<ICustomProps> = (props: ICustomProps) => {
  const [form] = Form.useForm();
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Custom reminders
      </Title>
      <Form form={form}>
        <Input placeholder="Add a reminder" />
        <Select
          defaultValue="basics"
          style={{ width: 120 }}
          //  onChange={handleChange}
          options={[
            { value: "basics", label: "Basics" },
            { value: "miscellaneous", label: "Miscellaneous" },
            { value: "clothes", label: "Clothes" },
            { value: "hygiene", label: "Hygiene" },
          ]}
        />
        <Button icon={<PlusOutlined />}>Add a reminder</Button>
      </Form>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name={["reminders", "custom", "custom"]}>
            <Table
              columns={props.columns}
              dataSource={travelAids}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Custom;
