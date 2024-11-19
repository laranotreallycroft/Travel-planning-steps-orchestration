import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import AppLayoutViewHeader from 'components/layout/AppLayoutViewHeader';
import React from 'react';

export interface IAppLayoutViewOwnProps {
  isUserLoggedIn: boolean;
}

type IAppLayoutViewProps = IAppLayoutViewOwnProps;

const AppLayoutView: React.FC<IAppLayoutViewProps> = (props: IAppLayoutViewProps) => {
  return (
    <Layout className="fullHeight">
      <Header className="appLayoutView__header">
        <AppLayoutViewHeader isUserLoggedIn={props.isUserLoggedIn} />
      </Header>
    </Layout>
  );
};

export default AppLayoutView;
