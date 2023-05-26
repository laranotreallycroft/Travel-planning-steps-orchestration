import HomeView from "./HomeView";

export interface IHomeContainerOwnProps {}

type IHomeContainerProps = IHomeContainerOwnProps;

const HomeContainer: React.FC<IHomeContainerProps> = (
  props: IHomeContainerProps
) => {
  return <HomeView />;
};

export default HomeContainer;
