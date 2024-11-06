import { CredentialResponse } from "@react-oauth/google";
import RegistrationView from "components/registration/RegistrationView";
import {
  IGoogleLoginPayload,
  LoginBusinessStore,
} from "service/business/login/LoginBusinessStore";
import {
  IRegistrationPayload,
  RegistrationBusinessStore,
} from "service/business/registration/RegistrationBusinessStore";
import { connect } from "react-redux";
import { useCallback } from "react";

export interface IRegistrationContainerOwnProps {}
export interface IRegistrationContainerStateProps {}
export interface IRegistrationContainerDispatchProps {
  registration: (registrationPayload: IRegistrationPayload) => void;
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) => void;
}
type IRegistrationContainerProps = IRegistrationContainerOwnProps &
  IRegistrationContainerStateProps &
  IRegistrationContainerDispatchProps;

const RegistrationContainer: React.FC<IRegistrationContainerProps> = (
  props: IRegistrationContainerProps
) => {
  const handleGoogleLogin = useCallback(
    (googleCredential: CredentialResponse) => {
      if (googleCredential.credential) {
        const googleLoginPayload: IGoogleLoginPayload = {
          credential: googleCredential.credential,
        };
        props.googleLogin(googleLoginPayload);
      }
    },
    [props.googleLogin]
  );

  const handleRegistration = useCallback(
    (registrationPayload: IRegistrationPayload) => {
      props.registration(registrationPayload);
    },
    [props.registration]
  );

  return (
    <RegistrationView
      onGoogleLogin={handleGoogleLogin}
      onRegistration={handleRegistration}
    />
  );
};

const mapStateToProps = (state: any): IRegistrationContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): IRegistrationContainerDispatchProps => ({
  registration: (registrationPayload: IRegistrationPayload) =>
    dispatch(
      RegistrationBusinessStore.actions.registration(registrationPayload)
    ),
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) =>
    dispatch(LoginBusinessStore.actions.googleLogin(googleLoginPayload)),
});

export default connect<
  IRegistrationContainerStateProps,
  IRegistrationContainerDispatchProps,
  IRegistrationContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
