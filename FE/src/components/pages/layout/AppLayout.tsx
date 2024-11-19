import AppLayoutContainer from 'components/layout/AppLayoutContainer';

export interface IAppLayoutOwnProps {}

type IAppLayoutProps = IAppLayoutOwnProps;

const AppLayout: React.FC<IAppLayoutProps> = (props: IAppLayoutProps) => {
  return <AppLayoutContainer />;
};

export default AppLayout;
