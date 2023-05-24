import { CredentialResponse } from "@react-oauth/google";
import RegistrationView from "./RegistrationView";
import {
  IGoogleLoginPayload,
  LoginBusinessStore,
} from "../../service/business/login/LoginBusinessStore";
import {
  IRegistrationPayload,
  RegistrationBusinessStore,
} from "../../service/business/registration/RegistrationBusinessStore";
import { connect } from "react-redux";
import { useCallback } from "react";

export interface IRegistrationContainerOwnProps {}
export interface IRegistrationContainerStateProps {}
export interface IRegistrationContainerDispatchProps {
  doRegistration: (registrationPayload: IRegistrationPayload) => void;
  doGoogleLogin: (googleLoginPayload: IGoogleLoginPayload) => void;
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
        props.doGoogleLogin(googleLoginPayload);
      }
    },
    [props.doGoogleLogin]
  );

  const handleRegistration = useCallback(
    (registrationPayload: IRegistrationPayload) => {
      props.doRegistration(registrationPayload);
    },
    [props.doRegistration]
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
  doRegistration: (registrationPayload: IRegistrationPayload) =>
    dispatch(
      RegistrationBusinessStore.actions.doRegistration(registrationPayload)
    ),
  doGoogleLogin: (googleLoginPayload: IGoogleLoginPayload) =>
    dispatch(LoginBusinessStore.actions.doGoogleLogin(googleLoginPayload)),
});

export default connect<
  IRegistrationContainerStateProps,
  IRegistrationContainerDispatchProps,
  IRegistrationContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
