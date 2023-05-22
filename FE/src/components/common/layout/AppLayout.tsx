import { Outlet } from "react-router-dom";

export interface IAppLayoutOwnProps {}
type IAppLayoutProps = IAppLayoutOwnProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  return <Outlet />;
};

export default AppLayout;
