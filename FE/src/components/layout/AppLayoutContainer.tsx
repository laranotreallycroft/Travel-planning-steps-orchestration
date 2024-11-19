import AppLayoutView from 'components/layout/AppLayoutView';
import React from 'react';
import { connect } from 'react-redux';

export interface IAppLayoutContainerOwnProps {}
export interface IAppLayoutContainerStateProps {}
export interface IAppLayoutContainerDispatchProps {}
type IAppLayoutContainerProps = IAppLayoutContainerOwnProps & IAppLayoutContainerStateProps & IAppLayoutContainerDispatchProps;

const AppLayoutContainer: React.FC<IAppLayoutContainerProps> = (props: IAppLayoutContainerProps) => {
  return <AppLayoutView />;
};

const mapStateToProps = (state: any): IAppLayoutContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): IAppLayoutContainerDispatchProps => ({});

export default connect<IAppLayoutContainerStateProps, IAppLayoutContainerDispatchProps, IAppLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(AppLayoutContainer);
