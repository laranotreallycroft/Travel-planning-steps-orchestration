import { Col, Form, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React from "react";
import { TableDataType } from "../ThirdStep";
const documents = [
  {
    title: "Emergency Contact Info",
    dataIndex: "emergencyContactInfo",
    key: "emergencyContactInfo",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "documents",
    subgroupTitle: "Documents",
  },
  {
    title: "Medical Insurance Card",
    dataIndex: "medicalInsuranceCard",
    key: "medicalInsuranceCard",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "documents",
    subgroupTitle: "Documents",
  },
  {
    title: "Prescriptions",
    dataIndex: "prescriptions",
    key: "prescriptions",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "documents",
    subgroupTitle: "Documents",
  },
  {
    title: "Travel Insurance",
    dataIndex: "travelInsurance",
    key: "travelInsurance",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "documents",
    subgroupTitle: "Documents",
  },
  {
    title: "Car Insurance Card",
    dataIndex: "carInsuranceCard",
    key: "carInsuranceCard",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "documents",
    subgroupTitle: "Documents",
  },
];

const miscellaneous = [
  {
    title: "Umbrella",
    dataIndex: "umbrella",
    key: "umbrella",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "House Keys",
    dataIndex: "houseKeys",
    key: "houseKeys",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "Luggage Tags",
    dataIndex: "luggageTags",
    key: "luggageTags",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "Hospitality Gifts",
    dataIndex: "hospitalityGifts",
    key: "hospitalityGifts",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "Journal",
    dataIndex: "journal",
    key: "journal",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "Beach Towel",
    dataIndex: "beachTowel",
    key: "beachTowel",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
  {
    title: "Beach Ball",
    dataIndex: "beachBall",
    key: "beachBall",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "miscellaneous",
    subgroupTitle: "Miscellaneous",
  },
];

const bags = [
  {
    title: "Backpack",
    dataIndex: "backpack",
    key: "backpack",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "bags",
    subgroupTitle: "Bags",
  },
  {
    title: "Purse",
    dataIndex: "purse",
    key: "purse",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "bags",
    subgroupTitle: "Bags",
  },
  {
    title: "Tote",
    dataIndex: "tote",
    key: "tote",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "bags",
    subgroupTitle: "bags",
  },
  {
    title: "Plastic Bags",
    dataIndex: "plasticBags",
    key: "plasticBags",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "bags",
    subgroupTitle: "Bags",
  },
];

const technology = [
  {
    title: "Cell Phone",
    dataIndex: "cellPhone",
    key: "cellPhone",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Cell Phone Charger",
    dataIndex: "cellPhoneCharger",
    key: "cellPhoneCharger",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Laptop",
    dataIndex: "laptop",
    key: "laptop",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Laptop Charger",
    dataIndex: "laptopCharger",
    key: "laptopCharger",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Camera",
    dataIndex: "camera",
    key: "camera",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Camera Charger",
    dataIndex: "cameraCharger",
    key: "cameraCharger",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Headphones",
    dataIndex: "headphones",
    key: "headphones",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Batteries",
    dataIndex: "batteries",
    key: "batteries",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
  {
    title: "Flashlight",
    dataIndex: "flashlight",
    key: "flashlight",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "technology",
    subgroupTitle: "Technology",
  },
];

const work = [
  {
    title: "Work Documents",
    dataIndex: "workDocuments",
    key: "workDocuments",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "work",
    subgroupTitle: "Work",
  },
  {
    title: "Office Supplies",
    dataIndex: "officeSupplies",
    key: "officeSupplies",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "work",
    subgroupTitle: "Work",
  },
  {
    title: "Notebook",
    dataIndex: "notebook",
    key: "notebook",
    group: "miscellaneous",
    groupTitle: "Miscellaneous",
    subgroup: "work",
    subgroupTitle: "Work",
  },
];

export interface IMiscellaneousOwnProps {
  isHidden: boolean;
  columns: ColumnsType<TableDataType>;
  selectedRowKeys: React.Key[];
  onSelect: (record: TableDataType, selected: boolean) => void;
}
type IMiscellaneousProps = IMiscellaneousOwnProps;

const Miscellaneous: React.FC<IMiscellaneousProps> = (
  props: IMiscellaneousProps
) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Miscellaneous
      </Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name={["reminders", "miscellaneous", "documents"]}>
            <Table
              columns={props.columns}
              dataSource={documents}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "miscellaneous", "bags"]}>
            <Table
              columns={props.columns}
              dataSource={bags}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "miscellaneous", "miscellaneous"]}>
            <Table
              columns={props.columns}
              dataSource={miscellaneous}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "miscellaneous", "technology"]}>
            <Table
              columns={props.columns}
              dataSource={technology}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "miscellaneous", "work"]}>
            <Table
              columns={props.columns}
              dataSource={work}
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

export default Miscellaneous;
