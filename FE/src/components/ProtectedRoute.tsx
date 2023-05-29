import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { LoginBusinessStore } from "../service/business/login/LoginBusinessStore";

export interface IProtectedRouteOwnProps {
  children?: React.ReactElement;
  forLoggedIn: boolean;
}
export interface IProtectedRouteStateProps {
  isUserLoggedIn: boolean;
}
export interface IProtectedRouteDispatchProps {}
type IProtectedRouteProps = IProtectedRouteOwnProps &
  IProtectedRouteStateProps &
  IProtectedRouteDispatchProps;

const ProtectedRoute: React.FC<IProtectedRouteProps> = (
  props: IProtectedRouteProps
) => {
  if (!props.isUserLoggedIn && props.forLoggedIn) {
    return <Navigate to={"login"} replace />;
  } else if (props.isUserLoggedIn && !props.forLoggedIn) {
    return <Navigate to={""} replace />;
  }
  return props.children ? props.children : <Outlet />;
};

const mapStateToProps = (state: any): IProtectedRouteStateProps => ({
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (
  dispatch: any
): IProtectedRouteDispatchProps => ({});

export default connect<
  IProtectedRouteStateProps,
  IProtectedRouteDispatchProps,
  IProtectedRouteOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
