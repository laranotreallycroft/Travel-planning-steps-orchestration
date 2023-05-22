import LoginContainer from "../login/LoginContainer";

export interface ILoginPageOwnProps {}

type ILoginPageProps = ILoginPageOwnProps;

const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) => {
  return <LoginContainer />;
};

export default LoginPage;
