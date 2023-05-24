import { CredentialResponse } from "@react-oauth/google";
import {
  IGoogleLoginPayload,
  ILoginPayload,
  LoginBusinessStore,
} from "../../service/business/login/LoginBusinessStore";
import LoginView from "./LoginView";
import { connect } from "react-redux";
import { useCallback } from "react";
import React from "react";

export interface ILoginContainerOwnProps {}
export interface ILoginContainerStateProps {}
export interface ILoginContainerDispatchProps {
  doLogin: (loginPayload: ILoginPayload) => void;
  doGoogleLogin: (googleLoginPayload: IGoogleLoginPayload) => void;
}
type ILoginContainerProps = ILoginContainerOwnProps &
  ILoginContainerStateProps &
  ILoginContainerDispatchProps;

const LoginContainer: React.FC<ILoginContainerProps> = (
  props: ILoginContainerProps
) => {
  const handleGoogleLogin = useCallback(
    (googleCredential: CredentialResponse) => {
      if (googleCredential.credential) {
        const googleLoginPayload: IGoogleLoginPayload = {
          credential: googleCredential.credential,
        };
        props.doGoogleLogin(googleLoginPayload);
      }
    },
    [props.doGoogleLogin]
  );

  const handleLogin = useCallback(
    (loginValues: ILoginPayload) => {
      props.doLogin(loginValues);
    },
    [props.doLogin]
  );

  return (
    <React.Fragment>
      <LoginView onGoogleLogin={handleGoogleLogin} onLogin={handleLogin} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): ILoginContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ILoginContainerDispatchProps => ({
  doLogin: (loginPayload: ILoginPayload) =>
    dispatch(LoginBusinessStore.actions.doLogin(loginPayload)),
  doGoogleLogin: (googleLoginPayload: IGoogleLoginPayload) =>
    dispatch(LoginBusinessStore.actions.doGoogleLogin(googleLoginPayload)),
});

export default connect<
  ILoginContainerStateProps,
  ILoginContainerDispatchProps,
  ILoginContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
