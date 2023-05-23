import { CredentialResponse } from "@react-oauth/google";
import RegistrationView from "./RegistrationView";
import {
  IGoogleLoginPayload,
  googleLogin,
} from "../../service/business/login/LoginBusinessStore";
import {
  IRegistrationPayload,
  registration,
} from "../../service/business/registration/RegistrationBusinessStore";

export interface IRegistrationContainerOwnProps {}

type IRegistrationContainerProps = IRegistrationContainerOwnProps;

const RegistrationContainer: React.FC<IRegistrationContainerProps> = (
  props: IRegistrationContainerProps
) => {
  const handleGoogleLogin = (googleCredential: CredentialResponse) => {
    if (googleCredential.credential) {
      const googleLoginPayload: IGoogleLoginPayload = {
        credential: googleCredential.credential,
      };
      googleLogin(googleLoginPayload);
    }
  };

  const handleRegistration = (registrationValues: IRegistrationPayload) => {
    registration(registrationValues);
  };
  return (
    <RegistrationView
      onGoogleLogin={handleGoogleLogin}
      onRegistration={handleRegistration}
    />
  );
};

export default RegistrationContainer;
