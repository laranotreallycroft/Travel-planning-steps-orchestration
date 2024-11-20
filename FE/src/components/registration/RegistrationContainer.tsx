import { CredentialResponse } from '@react-oauth/google';
import RegistrationView from 'components/registration/RegistrationView';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { IGoogleLoginPayload, LoginBusinessStore } from 'service/business/login/LoginBusinessStore';
import { IUserCreatePayload, UserBusinessStore } from 'service/business/user/UserBusinessStore';

export interface IRegistrationContainerOwnProps {}
export interface IRegistrationContainerStateProps {}
export interface IRegistrationContainerDispatchProps {
  createUser: (payload: IUserCreatePayload) => void;
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) => void;
}
type IRegistrationContainerProps = IRegistrationContainerOwnProps & IRegistrationContainerStateProps & IRegistrationContainerDispatchProps;

const RegistrationContainer: React.FC<IRegistrationContainerProps> = (props: IRegistrationContainerProps) => {
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

  const handleUserCreate = useCallback(
    (registrationPayload: IUserCreatePayload) => {
      props.createUser(registrationPayload);
    },
    [props.createUser]
  );

  return <RegistrationView onGoogleLogin={handleGoogleLogin} onUserCreate={handleUserCreate} />;
};

const mapStateToProps = (state: any): IRegistrationContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): IRegistrationContainerDispatchProps => ({
  createUser: (registrationPayload: IUserCreatePayload) => dispatch(UserBusinessStore.actions.createUser(registrationPayload)),
  googleLogin: (googleLoginPayload: IGoogleLoginPayload) => dispatch(LoginBusinessStore.actions.googleLogin(googleLoginPayload)),
});

export default connect<IRegistrationContainerStateProps, IRegistrationContainerDispatchProps, IRegistrationContainerOwnProps>(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
