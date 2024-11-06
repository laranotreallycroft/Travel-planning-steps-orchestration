import LogoutView from "components/logout/LogoutView";

export interface ILogoutContainerOwnProps {}

type ILogoutContainerProps = ILogoutContainerOwnProps;

const LogoutContainer: React.FC<ILogoutContainerProps> = (
  props: ILogoutContainerProps
) => {
  return <LogoutView />;
};

export default LogoutContainer;
