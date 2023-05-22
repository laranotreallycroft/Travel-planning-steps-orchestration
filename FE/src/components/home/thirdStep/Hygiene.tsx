import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React from "react";
import { TableDataType } from "../ThirdStep";
import { Row, Col, Form } from "antd";

const hygieneColOne = [
  {
    title: "Toothbrush",
    dataIndex: "toothbrush",
    key: "toothbrush",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Toothpaste",
    dataIndex: "toothpaste",
    key: "toothpaste",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Dental Floss",
    dataIndex: "dentalFloss",
    key: "dentalFloss",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Mouthwash",
    dataIndex: "mouthwash",
    key: "mouthwash",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Soap",
    dataIndex: "soap",
    key: "soap",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Washcloth",
    dataIndex: "washcloth",
    key: "washcloth",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Deodorant",
    dataIndex: "deodorant",
    key: "deodorant",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Shampoo",
    dataIndex: "shampoo",
    key: "shampoo",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Conditioner",
    dataIndex: "conditioner",
    key: "conditioner",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Brush",
    dataIndex: "brush",
    key: "brush",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Comb",
    dataIndex: "comb",
    key: "comb",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Curling Iron",
    dataIndex: "curlingIron",
    key: "curlingIron",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Flat Iron",
    dataIndex: "flatIron",
    key: "flatIron",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Styling Products",
    dataIndex: "stylingProducts",
    key: "stylingProducts",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
];

const hygieneColTwo = [
  {
    title: "Hair Accessories",
    dataIndex: "hairAccessories",
    key: "hairAccessories",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Mirror",
    dataIndex: "mirror",
    key: "mirror",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Cleanser",
    dataIndex: "cleanser",
    key: "cleanser",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Sunscreen",
    dataIndex: "sunscreen",
    key: "sunscreen",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Moisturizer",
    dataIndex: "moisturizer",
    key: "moisturizer",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Lip Balm",
    dataIndex: "lipBalm",
    key: "lipBalm",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Contact Lenses",
    dataIndex: "contactLenses",
    key: "contactLenses",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Saline Solution",
    dataIndex: "salineSolution",
    key: "salineSolution",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Shaving Cream",
    dataIndex: "shavingCream",
    key: "shavingCream",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Razor",
    dataIndex: "razor",
    key: "razor",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Perfume",
    dataIndex: "perfume",
    key: "perfume",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Makeup",
    dataIndex: "makeup",
    key: "makeup",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Makeup Remover",
    dataIndex: "makeupRemover",
    key: "makeupRemover",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Birth Control",
    dataIndex: "birthControl",
    key: "birthControl",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
];

const hygieneColThree = [
  {
    title: "Feminine Hygiene",
    dataIndex: "feminineHygiene",
    key: "feminineHygiene",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Nail Clippers",
    dataIndex: "nailClippers",
    key: "nailClippers",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Nail File",
    dataIndex: "nailFile",
    key: "nailFile",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Hand Wipes",
    dataIndex: "handWipes",
    key: "handWipes",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Tissues",
    dataIndex: "tissues",
    key: "tissues",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Cotton Swabs",
    dataIndex: "cottonSwabs",
    key: "cottonSwabs",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Tweezers",
    dataIndex: "tweezers",
    key: "tweezers",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Insect Repellent",
    dataIndex: "insectRepellent",
    key: "insectRepellent",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Medications",
    dataIndex: "medications",
    key: "medications",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Pain Reliever",
    dataIndex: "painReliever",
    key: "painReliever",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Vitamins",
    dataIndex: "vitamins",
    key: "vitamins",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "First Aid",
    dataIndex: "firstAid",
    key: "firstAid",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Band Aids",
    dataIndex: "bandAids",
    key: "bandAids",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
  {
    title: "Towels",
    dataIndex: "towels",
    key: "towels",
    group: "hygiene",
    groupTitle: "Hygiene",
    subgroup: "hygiene",
    subgroupTitle: "Hygiene",
  },
];
export interface IHygieneOwnProps {
  isHidden: boolean;
  columns: ColumnsType<TableDataType>;
  selectedRowKeys: React.Key[];
  onSelect: (record: TableDataType, selected: boolean) => void;
}
type IHygieneProps = IHygieneOwnProps;

const Hygiene: React.FC<IHygieneProps> = (props: IHygieneProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Hygiene
      </Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name={["reminders", "hygiene", "hygiene"]}>
            <Table
              columns={props.columns}
              dataSource={hygieneColOne}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "hygiene", "hygiene"]}>
            <Table
              columns={props.columns}
              dataSource={hygieneColTwo}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "hygiene", "hygiene"]}>
            <Table
              columns={props.columns}
              dataSource={hygieneColThree}
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

export default Hygiene;
