import { Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export interface IFallbackViewOwnProps {}

type IFallbackViewProps = IFallbackViewOwnProps;

const FallbackView: React.FC<IFallbackViewProps> = (
  props: IFallbackViewProps
) => {
  return (
    <Row justify={"center"}>
      <Title className="title">This page does not exist...</Title>
    </Row>
  );
};

export default FallbackView;
