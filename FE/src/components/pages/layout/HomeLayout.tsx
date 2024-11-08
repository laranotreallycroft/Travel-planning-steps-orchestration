import HomeLayoutContainer from "components/home/HomeLayoutContainer";

export interface IHomeLayoutOwnProps {}

type IHomeLayoutProps = IHomeLayoutOwnProps;

const HomeLayout: React.FC<IHomeLayoutProps> = (props: IHomeLayoutProps) => {
  return <HomeLayoutContainer />;
};

export default HomeLayout;
