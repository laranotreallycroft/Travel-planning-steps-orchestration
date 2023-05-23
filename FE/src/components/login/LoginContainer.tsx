import { CredentialResponse } from "@react-oauth/google";
import {
  IGoogleLoginPayload,
  IRegularLoginPayload,
  googleLogin,
  regularLogin,
} from "../../service/login/loginBusinessStore";
import LoginView from "./LoginView";

export interface ILoginContainerOwnProps {}

type ILoginContainerProps = ILoginContainerOwnProps;

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

  const handleRegularLogin = (loginValues: IRegularLoginPayload) => {
    regularLogin(loginValues);
  };

  return (
    <LoginView
      onGoogleLogin={handleGoogleLogin}
      onRegularLogin={handleRegularLogin}
    />
  );
};

export default LoginContainer;
