import PageLayoutView from "components/layout/PageLayoutView";
import React from "react";
import { connect } from "react-redux";

export interface IHomeLayoutContainerOwnProps {}
export interface IHomeLayoutContainerStateProps {}
export interface IHomeLayoutContainerDispatchProps {}
type IHomeLayoutContainerProps = IHomeLayoutContainerOwnProps &
  IHomeLayoutContainerStateProps &
  IHomeLayoutContainerDispatchProps;

const HomeLayoutContainer: React.FC<IHomeLayoutContainerProps> = (
  props: IHomeLayoutContainerProps
) => {
  return <PageLayoutView />;
};

const mapStateToProps = (state: any): IHomeLayoutContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): IHomeLayoutContainerDispatchProps => ({});

export default connect<
  IHomeLayoutContainerStateProps,
  IHomeLayoutContainerDispatchProps,
  IHomeLayoutContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayoutContainer);
