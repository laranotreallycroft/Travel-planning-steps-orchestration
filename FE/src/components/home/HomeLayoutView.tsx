import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ITrip } from "../../model/trip/Trip";
import { IUserCredentials } from "../../model/user/User";
import TripCreateContainer from "../trip/create/TripCreateContainer";
import HomeLayoutViewHeader from "./HomeLayoutViewHeader";
import HomeLayoutViewSider from "./HomeLayoutViewSider";

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
  const [isTripCreateModalOpen, setIsTripCreateModalOpen] =
    useState<boolean>(false);

  const handleTripCreateModalOpen = () => {
    setIsTripCreateModalOpen(true);
  };

  const handleTripCreateModalClose = () => {
    setIsTripCreateModalOpen(false);
  };

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
          openTripCreateModal={handleTripCreateModalOpen}
        />
      </Header>
      <Layout hasSider>
        <Sider width={300} className="homeLayoutView__sider">
          <HomeLayoutViewSider />
        </Sider>
        <Content className="homeLayoutView__content">
          <div className="homeLayoutView__contentPanel">
            <Outlet />
          </div>
        </Content>
      </Layout>

      <TripCreateContainer
        onTripCreateModalClose={handleTripCreateModalClose}
        createTripModalOpen={isTripCreateModalOpen}
      />
    </Layout>
  );
};

export default HomeLayoutView;
