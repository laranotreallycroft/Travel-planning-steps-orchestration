import { Avatar, Button } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { IAppUserInfo } from "../../../model/appUser/appUser";
import { LoginBusinessStore } from "../../../service/business/login/LoginBusinessStore";
import { connect } from "react-redux";

export interface IAppLayoutOwnProps {}
export interface IAppLayoutStateProps {
  currentUser: IAppUserInfo;
}
export interface IAppLayoutDispatchProps {
  doLogout: () => void;
}
type IAppLayoutProps = IAppLayoutOwnProps &
  IAppLayoutStateProps &
  IAppLayoutDispatchProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  return (
    <React.Fragment>
      <div className="appLayout__userIcon">
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
        <Button onClick={props.doLogout}>logout</Button>
        <Button onClick={() => console.log(props.currentUser)}>user</Button>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IAppLayoutStateProps => ({
  currentUser: LoginBusinessStore.selectors.getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: any): IAppLayoutDispatchProps => ({
  doLogout: () => dispatch(LoginBusinessStore.actions.doLogout()),
});

export default connect<
  IAppLayoutStateProps,
  IAppLayoutDispatchProps,
  IAppLayoutOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);
