import AppLayoutView from 'components/layout/AppLayoutView';
import React from 'react';
import { connect } from 'react-redux';
import { LoginBusinessStore } from 'service/business/login/LoginBusinessStore';

export interface IAppLayoutContainerOwnProps {
  children?: React.ReactNode;
}
export interface IAppLayoutContainerStateProps {
  isUserLoggedIn: boolean;
}
export interface IAppLayoutContainerDispatchProps {
  logout: () => void;
}
type IAppLayoutContainerProps = IAppLayoutContainerOwnProps & IAppLayoutContainerStateProps & IAppLayoutContainerDispatchProps;

const AppLayoutContainer: React.FC<IAppLayoutContainerProps> = (props: IAppLayoutContainerProps) => {
  return (
    <AppLayoutView isUserLoggedIn={props.isUserLoggedIn} logout={props.logout}>
      {props.children}
    </AppLayoutView>
  );
};

const mapStateToProps = (state: any): IAppLayoutContainerStateProps => ({
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): IAppLayoutContainerDispatchProps => ({
  logout: () => dispatch(LoginBusinessStore.actions.logout()),
});

export default connect<IAppLayoutContainerStateProps, IAppLayoutContainerDispatchProps, IAppLayoutContainerOwnProps>(mapStateToProps, mapDispatchToProps)(AppLayoutContainer);
