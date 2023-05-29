import { Row } from "antd";
import React from "react";

export interface ITripPackingListViewOwnProps {}

type ITripPackingListViewProps = ITripPackingListViewOwnProps;

const TripPackingListView: React.FC<ITripPackingListViewProps> = (
  props: ITripPackingListViewProps
) => {
  return <Row className="fullHeight loginView_container"></Row>;
};

export default TripPackingListView;
