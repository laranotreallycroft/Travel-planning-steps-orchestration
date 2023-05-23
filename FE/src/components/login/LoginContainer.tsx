import { CredentialResponse } from "@react-oauth/google";
import {
  IGoogleLoginPayload,
  ILoginPayload,
  LoginBusinessStore,
  googleLogin,
} from "../../service/business/login/LoginBusinessStore";
import LoginView from "./LoginView";
import { connect } from "react-redux";

export interface ILoginContainerOwnProps {}
export interface ILoginContainerStateProps {
  isUserLoggedIn: boolean;
}
export interface ILoginContainerDispatchProps {
  doLogin: (loginPayload: ILoginPayload) => void;
}
type ILoginContainerProps = ILoginContainerOwnProps &
  ILoginContainerStateProps &
  ILoginContainerDispatchProps;

const LoginContainer: React.FC<ILoginContainerProps> = (
  props: ILoginContainerProps
) => {
  const handleGoogleLogin = (googleCredential: CredentialResponse) => {
    if (googleCredential.credential) {
      const googleLoginPayload: IGoogleLoginPayload = {
        credential: googleCredential.credential,
      };
      googleLogin(googleLoginPayload);
    }
  };

  const handleLogin = (loginValues: ILoginPayload) => {
    props.doLogin(loginValues);
  };

  return <LoginView onGoogleLogin={handleGoogleLogin} onLogin={handleLogin} />;
};

const mapStateToProps = (state: any): ILoginContainerStateProps => ({
  isUserLoggedIn: LoginBusinessStore.selectors.isUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): ILoginContainerDispatchProps => ({
  doLogin: (loginPayload: ILoginPayload) =>
    dispatch(LoginBusinessStore.actions.doLogin(loginPayload)),
});

export default connect<
  ILoginContainerStateProps,
  ILoginContainerDispatchProps,
  ILoginContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
