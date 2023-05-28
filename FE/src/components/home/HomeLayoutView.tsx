import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { ITrip } from "../../model/trip/Trip";
import HomeLayoutViewHeader from "./HomeLayoutViewHeader";
import { IUserCredentials } from "../../model/user/User";

export interface IHomeLayoutViewOwnProps {
  userTrips: ITrip[];
  selectedTrip: ITrip;
  onTripSelect: (selectedTrip: number) => void;
  onTripUpdate: (trip: ITrip) => void;
  isUserLoggedIn: boolean;
  currentUser: IUserCredentials;
  onLogout: () => void;
}

type IHomeLayoutViewProps = IHomeLayoutViewOwnProps;

const HomeLayoutView: React.FC<IHomeLayoutViewProps> = (
  props: IHomeLayoutViewProps
) => {
  return (
    <Layout className="fullHeight">
      <Header className="homeLayoutView__header">
        <HomeLayoutViewHeader
          onTripSelect={props.onTripSelect}
          selectedTrip={props.selectedTrip}
          userTrips={props.userTrips}
          currentUser={props.currentUser}
          isUserLoggedIn={props.isUserLoggedIn}
          logout={props.onLogout}
        />
      </Header>
      <Layout hasSider>
        <Sider className="homeLayoutView__sider">Sider</Sider>
        <Content className="homeLayoutView__content">Content</Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayoutView;
/*<div className="createTripView__backgroundImage">
      <HomeLayoutViewHeader
        userTrips={props.userTrips}
        selectedTrip={props.selectedTrip}
        onTripSelect={props.onTripSelect}
        onTripUpdate={props.onTripUpdate}
      />
      <Row justify={"space-between"}>
        <Col>
          <HomeLayoutViewSider
            selectedTrip={props.selectedTrip}
            onTripUpdate={props.onTripUpdate}
          />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </div>*/
