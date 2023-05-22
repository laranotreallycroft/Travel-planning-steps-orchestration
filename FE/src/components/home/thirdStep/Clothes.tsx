import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React from "react";
import { TableDataType } from "../ThirdStep";
import { Col, Form, Row } from "antd";
const basics = [
  {
    title: "Underwear",
    dataIndex: "underwear",
    key: "underwear",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Socks",
    dataIndex: "socks",
    key: "socks",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Undershirts",
    dataIndex: "undershirts",
    key: "undershirts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Bras",
    dataIndex: "bras",
    key: "bras",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Pantyhose",
    dataIndex: "pantyhose",
    key: "pantyhose",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Sleepwear",
    dataIndex: "sleepwear",
    key: "sleepwear",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
  {
    title: "Robe",
    dataIndex: "robe",
    key: "robe",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "basics",
    subgroupTitle: "Basics",
  },
];

const dressy = [
  {
    title: "Dress Shirts",
    dataIndex: "dressShirts",
    key: "dressShirts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Blazers",
    dataIndex: "blazers",
    key: "blazers",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Slacks",
    dataIndex: "slacks",
    key: "slacks",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Skirts",
    dataIndex: "skirts",
    key: "skirts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Dresses",
    dataIndex: "dresses",
    key: "dresses",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Suits",
    dataIndex: "suits",
    key: "suits",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Tuxedo",
    dataIndex: "tuxedo",
    key: "tuxedo",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
  {
    title: "Sweaters",
    dataIndex: "sweaters",
    key: "sweaters",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "dressy",
    subgroupTitle: "Dressy",
  },
];

const outerwear = [
  {
    title: "Jackets",
    dataIndex: "jackets",
    key: "jackets",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "outerwear",
    subgroupTitle: "Outerwear",
  },
  {
    title: "Raincoats",
    dataIndex: "raincoats",
    key: "raincoats",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "outerwear",
    subgroupTitle: "Outerwear",
  },
  {
    title: "Coats",
    dataIndex: "coats",
    key: "coats",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "outerwear",
    subgroupTitle: "Outerwear",
  },
  {
    title: "Skiwear",
    dataIndex: "skiwear",
    key: "skiwear",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "outerwear",
    subgroupTitle: "Outerwear",
  },
];

const casual = [
  {
    title: "T-Shirts",
    dataIndex: "tShirts",
    key: "tShirts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Tank Tops",
    dataIndex: "tankTops",
    key: "tankTops",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Sweatshirts",
    dataIndex: "sweatshirts",
    key: "sweatshirts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Jeans",
    dataIndex: "jeans",
    key: "jeans",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Exercise Clothing",
    dataIndex: "exerciseClothing",
    key: "exerciseClothing",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Shorts",
    dataIndex: "shorts",
    key: "shorts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
  {
    title: "Swimsuits",
    dataIndex: "swimsuits",
    key: "swimsuits",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "casual",
    subgroupTitle: "Casual",
  },
];

const footwear = [
  {
    title: "Athletic Shoes",
    dataIndex: "athleticShoes",
    key: "athleticShoes",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "footwear",
    subgroupTitle: "Footwear",
  },
  {
    title: "Leisure Shoes",
    dataIndex: "leisureShoes",
    key: "leisureShoes",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "footwear",
    subgroupTitle: "Footwear",
  },
  {
    title: "Dress Shoes",
    dataIndex: "dressShoes",
    key: "dressShoes",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "footwear",
    subgroupTitle: "Footwear",
  },
  {
    title: "Slippers",
    dataIndex: "slippers",
    key: "slippers",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "footwear",
    subgroupTitle: "Footwear",
  },
  {
    title: "Sandals",
    dataIndex: "sandals",
    key: "sandals",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "footwear",
    subgroupTitle: "Footwear",
  },
];

const accessories = [
  {
    title: "Belts",
    dataIndex: "belts",
    key: "belts",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Ties",
    dataIndex: "ties",
    key: "ties",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Scarves",
    dataIndex: "wristwatches",
    key: "scarves",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Hats",
    dataIndex: "hats",
    key: "hats",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Gloves",
    dataIndex: "gloves",
    key: "gloves",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Jewelry",
    dataIndex: "jewelry",
    key: "jewelry",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Sunglasses",
    dataIndex: "sunglasses",
    key: "sunglasses",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Reading Glasses",
    dataIndex: "readingGlasses",
    key: "readingGlasses",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
  {
    title: "Wristwatches",
    dataIndex: "wristwatches",
    key: "wristwatches",
    group: "clothes",
    groupTitle: "Clothes",
    subgroup: "accessories",
    subgroupTitle: "Accessories",
  },
];

export interface IClothesOwnProps {
  isHidden: boolean;
  columns: ColumnsType<TableDataType>;
  selectedRowKeys: React.Key[];
  onSelect: (record: TableDataType, selected: boolean) => void;
}
type IClothesProps = IClothesOwnProps;

const Clothes: React.FC<IClothesProps> = (props: IClothesProps) => {
  return (
    <React.Fragment>
      <Title level={3} className="font-neutral" hidden={props.isHidden}>
        Clothes
      </Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name={["reminders", "clothes", "basics"]}>
            <Table
              columns={props.columns}
              dataSource={basics}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "clothes", "dressy"]}>
            <Table
              columns={props.columns}
              dataSource={dressy}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "clothes", "outerwear"]}>
            <Table
              columns={props.columns}
              dataSource={outerwear}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "clothes", "casual"]}>
            <Table
              columns={props.columns}
              dataSource={casual}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "clothes", "footwear"]}>
            <Table
              columns={props.columns}
              dataSource={footwear}
              pagination={false}
              rowSelection={{
                onSelect: props.onSelect,
                selectedRowKeys: props.selectedRowKeys,
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={["reminders", "clothes", "accessories"]}>
            <Table
              columns={props.columns}
              dataSource={accessories}
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

export default Clothes;
