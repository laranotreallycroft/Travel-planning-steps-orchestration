import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import HomeLayoutViewHeader from 'components/home/HomeLayoutViewHeader';
import HomeLayoutViewSider from 'components/home/HomeLayoutViewSider';
import { ITrip } from 'model/trip/Trip';
import React from 'react';
import { Outlet } from 'react-router-dom';

export interface IHomeLayoutViewOwnProps {
  tripList: ITrip[];
  trip: ITrip;
  onTripSelect: (selectedTripId: number) => void;
}

type IHomeLayoutViewProps = IHomeLayoutViewOwnProps;

const HomeLayoutView: React.FC<IHomeLayoutViewProps> = (props: IHomeLayoutViewProps) => {
  return (
    <Layout>
      <Header className="homeLayoutView__header">
        <HomeLayoutViewHeader onTripSelect={props.onTripSelect} trip={props.trip} tripList={props.tripList} />
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
    </Layout>
  );
};

export default HomeLayoutView;
