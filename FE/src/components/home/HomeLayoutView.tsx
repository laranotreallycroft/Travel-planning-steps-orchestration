import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { Outlet } from "react-router-dom";
import { ITrip } from "../../model/trip/Trip";
import HomeLayoutViewHeader from "./HomeLayoutViewHeader";
import HomeLayoutViewSider from "./HomeLayoutViewSider";

export interface IHomeLayoutViewOwnProps {
  userTrips: ITrip[];
  selectedTrip: ITrip;
  onTripSelect: (selectedTrip: number) => void;
  onTripUpdate: (trip: ITrip) => void;
}

type IHomeLayoutViewProps = IHomeLayoutViewOwnProps;

const HomeLayoutView: React.FC<IHomeLayoutViewProps> = (
  props: IHomeLayoutViewProps
) => {
  return (
    <div className="createTripView__backgroundImage">
      <Row justify={"center"}>
        <Title className="title">Your travel plans</Title>
      </Row>
      <div className="container">
        <HomeLayoutViewHeader
          userTrips={props.userTrips}
          selectedTrip={props.selectedTrip}
          onTripSelect={props.onTripSelect}
          onTripUpdate={props.onTripUpdate}
        />
        <Row justify={"space-between"}>
          <Col>
            <Outlet />
          </Col>
          <Col>
            <HomeLayoutViewSider
              selectedTrip={props.selectedTrip}
              onTripUpdate={props.onTripUpdate}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomeLayoutView;
