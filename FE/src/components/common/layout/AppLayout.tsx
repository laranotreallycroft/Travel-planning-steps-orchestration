import { Avatar } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export interface IAppLayoutOwnProps {}
type IAppLayoutProps = IAppLayoutOwnProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  return (
    <React.Fragment>
      <Avatar
        shape="square"
        size="large"
        icon={<UserOutlined />}
        className="appLayout__userIcon"
      />
      <Outlet />
    </React.Fragment>
  );
};

export default AppLayout;
