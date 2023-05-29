import { Layout, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { ITrip } from "../../model/trip/Trip";
import HomeLayoutViewHeader from "./HomeLayoutViewHeader";
import { IUserCredentials } from "../../model/user/User";
import HomeLayoutViewSider from "./HomeLayoutViewSider";
import CreateTripContainer from "../createTrip/CreateTripContainer";
import { Outlet } from "react-router-dom";

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
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] =
    useState<boolean>(false);

  const handleCreateTripModalOpen = () => {
    setIsCreateTripModalOpen(true);
  };

  const handleCreateTripModalClose = () => {
    setIsCreateTripModalOpen(false);
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
          openCreateTripModal={handleCreateTripModalOpen}
        />
      </Header>
      <Layout hasSider>
        <Sider width={300} className="homeLayoutView__sider">
          <HomeLayoutViewSider />
        </Sider>
        <Content className="homeLayoutView__content">
          <Outlet />
        </Content>
      </Layout>
      <Modal
        title="Create trip"
        open={isCreateTripModalOpen}
        footer={null}
        className="homeLayoutView__createTripModal"
      >
        <CreateTripContainer
          onCreateTripModalClose={handleCreateTripModalClose}
        />
      </Modal>
    </Layout>
  );
};

export default HomeLayoutView;
