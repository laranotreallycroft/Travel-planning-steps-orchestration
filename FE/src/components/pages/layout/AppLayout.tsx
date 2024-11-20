import AppLayoutContainer from 'components/layout/AppLayoutContainer';
import { Outlet } from 'react-router-dom';

export interface IAppLayoutOwnProps {}

type IAppLayoutProps = IAppLayoutOwnProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  return (
    <AppLayoutContainer>
      <Outlet />
    </AppLayoutContainer>
  );
};

export default AppLayout;
