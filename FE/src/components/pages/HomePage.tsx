import HomeContainer from "../home/HomeContainer";

export interface IHomePageOwnProps {}

type IHomePageProps = IHomePageOwnProps;

const HomePage: React.FC<IHomePageProps> = (props: IHomePageProps) => {
  return <HomeContainer />;
};

export default HomePage;
