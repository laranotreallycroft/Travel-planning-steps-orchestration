import { Col, Form, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React from "react";
import { TableDataType } from "../ThirdStep";
const travelAids = [
  {
    title: "Pleasure Reading",
    dataIndex: "pleasureReading",
    key: "pleasureReading",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Chewing Gum",
    dataIndex: "chewingGum",
    key: "chewingGum",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Snacks",
    dataIndex: "snacks",
    key: "snacks",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Water Bottle",
    dataIndex: "waterBottle",
    key: "waterBottle",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Earplugs",
    dataIndex: "earplugs",
    key: "earplugs",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Sleeping Mask",
    dataIndex: "sleepingMask",
    key: "sleepingMask",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Travel Pillow",
    dataIndex: "travelPillow",
    key: "travelPillow",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Motion Sickness Remedy",
    dataIndex: "motionSicknessRemedy",
    key: "motionSicknessRemedy",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Sleeping Pills",
    dataIndex: "sleepingPills",
    key: "sleepingPills",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
  {
    title: "Anxiety Medication",
    dataIndex: "anxietyMedication",
    key: "anxietyMedication",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelAids",
    subgroupTitle: "Travel Aids",
  },
];

const funds = [
  {
    title: "Wallet",
    dataIndex: "wallet",
    key: "wallet",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "funds",
    subgroupTitle: "Funds",
  },
  {
    title: "Cash",
    dataIndex: "cash",
    key: "cash",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "funds",
    subgroupTitle: "Funds",
  },
  {
    title: "Credit Cards",
    dataIndex: "creditCards",
    key: "creditCards",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "funds",
    subgroupTitle: "Funds",
  },
];

const travelInfo = [
  {
    title: "Passport",
    dataIndex: "passport",
    key: "passport",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
  {
    title: "Visa",
    dataIndex: "visa",
    key: "visa",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
  {
    title: "Driver's Licence",
    dataIndex: "driversLicence",
    key: "driversLicence",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
  {
    title: "Maps",
    dataIndex: "maps",
    key: "maps",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
  {
    title: "Travel Tickets",
    dataIndex: "travelTickets",
    key: "travelTickets",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
  {
    title: "Travel Guides",
    dataIndex: "travelGuides",
    key: "travelGuides",
    group: "basics",
    groupTitle: "Basics",
    subgroup: "travelInfo",
    subgroupTitle: "Travel Info",
  },
];

export interface IBasicsOwnProps {
  isHidden: boolean;
  columns: ColumnsType<TableDataType>;
  selectedRowKeys: React.Key[];
  onSelect: (record: TableDataType, selected: boolean) => void;
}
type IBasicsProps = IBasicsOwnProps;

const Basics: React.FC<IBasicsProps> = (props: IBasicsProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Basics
      </Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name={["reminders", "basics", "travelAids"]}>
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
        <Col>
          <Form.Item name={["reminders", "basics", "funds"]}>
            <Table
              columns={props.columns}
              dataSource={funds}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "basics", "travelInfo"]}>
            <Table
              columns={props.columns}
              dataSource={travelInfo}
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

export default Basics;
