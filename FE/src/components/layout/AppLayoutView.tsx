import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import AppLayoutViewHeader from 'components/layout/AppLayoutViewHeader';
import React from 'react';

export interface IAppLayoutViewOwnProps {
  children?: React.ReactNode;
  isUserLoggedIn: boolean;
  logout: () => void;
}

type IAppLayoutViewProps = IAppLayoutViewOwnProps;

const AppLayoutView: React.FC<IAppLayoutViewProps> = (props: IAppLayoutViewProps) => {
  return (
    <Layout className="fullHeight">
      <Header className="appLayoutView__header">
        <AppLayoutViewHeader isUserLoggedIn={props.isUserLoggedIn} logout={props.logout} />
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default AppLayoutView;
