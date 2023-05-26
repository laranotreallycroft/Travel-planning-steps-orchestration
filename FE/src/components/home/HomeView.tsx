import { Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export interface IHomeViewOwnProps {}

type IHomeViewProps = IHomeViewOwnProps;

const HomeView: React.FC<IHomeViewProps> = (props: IHomeViewProps) => {
  return (
    <div className="createTripView__backgroundImage">
      <Row justify={"center"}>
        <Title className="createTripView__title">Your travel plans</Title>
      </Row>
    </div>
  );
};

export default HomeView;
