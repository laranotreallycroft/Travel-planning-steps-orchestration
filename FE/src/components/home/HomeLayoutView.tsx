import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { ITrip } from "model/trip/Trip";
import TripCreateContainer from "components/trip/create/TripCreateContainer";
import HomeLayoutViewHeader from "components/home/HomeLayoutViewHeader";
import HomeLayoutViewSider from "components/home/HomeLayoutViewSider";

export interface IHomeLayoutViewOwnProps {
  userTrips: ITrip[];
  trip: ITrip;
  isUserLoggedIn: boolean;
  onTripSelect: (selectedTripId: number) => void;
  onLogout: () => void;
}

type IHomeLayoutViewProps = IHomeLayoutViewOwnProps;

const HomeLayoutView: React.FC<IHomeLayoutViewProps> = (
  props: IHomeLayoutViewProps
) => {
  const [isTripCreateModalOpen, setIsTripCreateModalOpen] =
    useState<boolean>(false);

  const toggleTripCreateModal = useCallback(() => {
    setIsTripCreateModalOpen((prevState) => !prevState);
  }, []);

  return (
    <Layout className="fullHeight">
      <Header className="homeLayoutView__header">
        <HomeLayoutViewHeader
          onTripSelect={props.onTripSelect}
          trip={props.trip}
          userTrips={props.userTrips}
          isUserLoggedIn={props.isUserLoggedIn}
          logout={props.onLogout}
          openTripCreateModal={toggleTripCreateModal}
        />
      </Header>
      {props.trip && (
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
      )}

      <TripCreateContainer
        onTripCreateModalClose={toggleTripCreateModal}
        isTripCreateModalOpen={isTripCreateModalOpen}
      />
    </Layout>
  );
};

export default HomeLayoutView;
