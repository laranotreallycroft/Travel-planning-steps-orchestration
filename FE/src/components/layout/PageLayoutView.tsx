import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import PageLayoutViewHeader from "components/layout/PageLayoutViewHeader";
import React from "react";

export interface IHomeLayoutViewOwnProps {}

type IHomeLayoutViewProps = IHomeLayoutViewOwnProps;

const HomeLayoutView: React.FC<IHomeLayoutViewProps> = (
  props: IHomeLayoutViewProps
) => {
  return (
    <Layout className="fullHeight">
      <Header className="pageLayoutView__header">
        <PageLayoutViewHeader />
      </Header>
    </Layout>
  );
};

export default HomeLayoutView;
