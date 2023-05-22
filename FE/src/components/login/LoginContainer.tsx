import LoginView from "./LoginView";

export interface ILoginContainerOwnProps {}

type ILoginContainerProps = ILoginContainerOwnProps;

const LoginContainer: React.FC<ILoginContainerProps> = (
  props: ILoginContainerProps
) => {
  return <LoginView />;
};

export default LoginContainer;
