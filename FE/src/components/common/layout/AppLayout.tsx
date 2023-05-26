import { Avatar, Dropdown, MenuProps } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { IUserCredentials } from "../../../model/user/User";
import { LoginBusinessStore } from "../../../service/business/login/LoginBusinessStore";
import { connect } from "react-redux";
import { UserBusinessStore } from "../../../service/business/user/UserBusinessStore";

export interface IAppLayoutOwnProps {}
export interface IAppLayoutStateProps {
  isUserLoggedIn: boolean;
  currentUser: IUserCredentials;
}
export interface IAppLayoutDispatchProps {
  logout: () => void;
}
type IAppLayoutProps = IAppLayoutOwnProps &
  IAppLayoutStateProps &
  IAppLayoutDispatchProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  const navigate = useNavigate();
  const loggedInItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      onClick: props.logout,
    },
  ];
  const loggedOutItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Login",
      onClick: () => navigate("/login"),
    },
  ];
  const items: MenuProps["items"] = props.isUserLoggedIn
    ? loggedInItems
    : loggedOutItems;

  return (
    <React.Fragment>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomLeft"
        className="appLayout__userIcon"
      >
        <div onClick={(e) => e.preventDefault()}>
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        </div>
      </Dropdown>
      <Outlet />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IAppLayoutStateProps => ({
  currentUser: UserBusinessStore.selectors.getCurrentUser(state),
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): IAppLayoutDispatchProps => ({
  logout: () => dispatch(LoginBusinessStore.actions.logout()),
});

export default connect<
  IAppLayoutStateProps,
  IAppLayoutDispatchProps,
  IAppLayoutOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);
