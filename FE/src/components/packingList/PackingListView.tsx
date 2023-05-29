import { Row } from "antd";
import React from "react";

export interface IPackingListViewOwnProps {}

type IPackingListViewProps = IPackingListViewOwnProps;

const PackingListView: React.FC<IPackingListViewProps> = (
  props: IPackingListViewProps
) => {
  return <Row className="fullHeight loginView_container"></Row>;
};

export default PackingListView;
