import FallbackView from "components/fallback/FallbackView";

export interface IFallbackPageOwnProps {}

type IFallbackPageProps = IFallbackPageOwnProps;

const FallbackPage: React.FC<IFallbackPageProps> = (
  props: IFallbackPageProps
) => {
  return <FallbackView />;
};

export default FallbackPage;
