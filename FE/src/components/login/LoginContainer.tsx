import { CredentialResponse } from '@react-oauth/google';
import { IGoogleLoginPayload, ILoginPayload, LoginBusinessStore } from 'service/business/login/LoginBusinessStore';
import LoginView from 'components/login/LoginView';
import { connect } from 'react-redux';
import { useCallback } from 'react';
import React from 'react';

export interface ILoginContainerOwnProps {}
export interface ILoginContainerStateProps {}
export interface ILoginContainerDispatchProps {
  login: (loginPayload: ILoginPayload) => void;
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) => void;
}
type ILoginContainerProps = ILoginContainerOwnProps & ILoginContainerStateProps & ILoginContainerDispatchProps;

const LoginContainer: React.FC<ILoginContainerProps> = (props: ILoginContainerProps) => {
  const handleGoogleLogin = useCallback((googleCredential: CredentialResponse) => {
    if (googleCredential.credential) {
      const googleLoginPayload: IGoogleLoginPayload = {
        credential: googleCredential.credential,
      };
      props.googleLogin(googleLoginPayload);
    }
  }, []);

  return <LoginView onGoogleLogin={handleGoogleLogin} onLogin={props.login} />;
};

const mapStateToProps = (state: any): ILoginContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ILoginContainerDispatchProps => ({
  login: (loginPayload: ILoginPayload) => dispatch(LoginBusinessStore.actions.login(loginPayload)),
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) => dispatch(LoginBusinessStore.actions.googleLogin(googleLoginPayload)),
});

export default connect<ILoginContainerStateProps, ILoginContainerDispatchProps, ILoginContainerOwnProps>(mapStateToProps, mapDispatchToProps)(LoginContainer);
