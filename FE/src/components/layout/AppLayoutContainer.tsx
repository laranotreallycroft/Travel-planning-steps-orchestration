import AppLayoutView from 'components/layout/AppLayoutView';
import React from 'react';
import { connect } from 'react-redux';
import { LoginBusinessStore } from 'service/business/login/LoginBusinessStore';

export interface IAppLayoutContainerOwnProps {}
export interface IAppLayoutContainerStateProps {
  isUserLoggedIn: boolean;
}
export interface IAppLayoutContainerDispatchProps {}
type IAppLayoutContainerProps = IAppLayoutContainerOwnProps & IAppLayoutContainerStateProps & IAppLayoutContainerDispatchProps;

const AppLayoutContainer: React.FC<IAppLayoutContainerProps> = (props: IAppLayoutContainerProps) => {
  return <AppLayoutView isUserLoggedIn={props.isUserLoggedIn} />;
};

const mapStateToProps = (state: any): IAppLayoutContainerStateProps => ({
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): IAppLayoutContainerDispatchProps => ({});

export default connect<IAppLayoutContainerStateProps, IAppLayoutContainerDispatchProps, IAppLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(AppLayoutContainer);
